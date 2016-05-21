'use strict';

var _lodash = require('lodash');

var Promise = require('./promise');

var PassThrough;

// The "Runner" constructor takes a "builder" (query, schema, or raw)
// and runs through each of the query statements, calling any additional
// "output" method provided alongside the query and bindings.
function Runner(client, builder) {
  this.client = client;
  this.builder = builder;
  this.queries = [];

  // The "connection" object is set on the runner when
  // "run" is called.
  this.connection = void 0;
}

(0, _lodash.assign)(Runner.prototype, {

  // "Run" the target, calling "toSQL" on the builder, returning
  // an object or array of queries to run, each of which are run on
  // a single connection.
  run: function run() {
    var runner = this;
    return Promise.using(this.ensureConnection(), function (connection) {
      runner.connection = connection;

      runner.client.emit('start', runner.builder);
      runner.builder.emit('start', runner.builder);
      var sql = runner.builder.toSQL();

      if (runner.builder._debug) {
        console.log(sql);
      }

      if ((0, _lodash.isArray)(sql)) {
        return runner.queryArray(sql);
      }
      return runner.query(sql);
    })

    // If there are any "error" listeners, we fire an error event
    // and then re-throw the error to be eventually handled by
    // the promise chain. Useful if you're wrapping in a custom `Promise`.
    ['catch'](function (err) {
      if (runner.builder._events && runner.builder._events.error) {
        runner.builder.emit('error', err);
      }
      throw err;
    })

    // Fire a single "end" event on the builder when
    // all queries have successfully completed.
    .tap(function () {
      runner.builder.emit('end');
    });
  },

  // Stream the result set, by passing through to the dialect's streaming
  // capabilities. If the options are
  stream: function stream(options, handler) {

    // If we specify stream(handler).then(...
    if (arguments.length === 1) {
      if (typeof options === 'function') {
        handler = options;
        options = {};
      }
    }

    // Determines whether we emit an error or throw here.
    var hasHandler = typeof handler === 'function';

    // Lazy-load the "PassThrough" dependency.
    PassThrough = PassThrough || require('readable-stream').PassThrough;

    var runner = this;
    var stream = new PassThrough({ objectMode: true });
    var promise = Promise.using(this.ensureConnection(), function (connection) {
      runner.connection = connection;
      var sql = runner.builder.toSQL();
      var err = new Error('The stream may only be used with a single query statement.');
      if ((0, _lodash.isArray)(sql)) {
        if (hasHandler) throw err;
        stream.emit('error', err);
      }
      return runner.client.stream(runner.connection, sql, stream, options);
    });

    // If a function is passed to handle the stream, send the stream
    // there and return the promise, otherwise just return the stream
    // and the promise will take care of itsself.
    if (hasHandler) {
      handler(stream);
      return promise;
    }
    return stream;
  },

  // Allow you to pipe the stream to a writable stream.
  pipe: function pipe(writable, options) {
    return this.stream(options).pipe(writable);
  },

  // "Runs" a query, returning a promise. All queries specified by the builder are guaranteed
  // to run in sequence, and on the same connection, especially helpful when schema building
  // and dealing with foreign key constraints, etc.
  query: Promise.method(function (obj) {
    var _this = this;

    this.builder.emit('query', (0, _lodash.assign)({ __knexUid: this.connection.__knexUid }, obj));
    var runner = this;
    var queryPromise = this.client.query(this.connection, obj);

    if (obj.timeout) {
      queryPromise = queryPromise.timeout(obj.timeout);
    }

    return queryPromise.then(function (resp) {
      var processedResponse = _this.client.processResponse(resp, runner);
      _this.builder.emit('query-response', processedResponse, (0, _lodash.assign)({ __knexUid: _this.connection.__knexUid }, obj), _this.builder);
      _this.client.emit('query-response', processedResponse, (0, _lodash.assign)({ __knexUid: _this.connection.__knexUid }, obj), _this.builder);
      return processedResponse;
    })['catch'](Promise.TimeoutError, function (error) {
      throw (0, _lodash.assign)(error, {
        message: 'Defined query timeout of ' + obj.timeout + 'ms exceeded when running query.',
        sql: obj.sql,
        bindings: obj.bindings,
        timeout: obj.timeout
      });
    })['catch'](function (error) {
      _this.builder.emit('query-error', error, (0, _lodash.assign)({ __knexUid: _this.connection.__knexUid }, obj));
      throw error;
    });
  }),

  // In the case of the "schema builder" we call `queryArray`, which runs each
  // of the queries in sequence.
  queryArray: function queryArray(queries) {
    return queries.length === 1 ? this.query(queries[0]) : Promise.bind(this)['return'](queries).reduce(function (memo, query) {
      return this.query(query).then(function (resp) {
        memo.push(resp);
        return memo;
      });
    }, []);
  },

  // Check whether there's a transaction flag, and that it has a connection.
  ensureConnection: function ensureConnection() {
    var runner = this;
    var acquireConnectionTimeout = runner.client.config.acquireConnectionTimeout || 60000;
    return Promise['try'](function () {
      return runner.connection || new Promise(function (resolver, rejecter) {
        runner.client.acquireConnection().timeout(acquireConnectionTimeout).then(resolver)['catch'](Promise.TimeoutError, function (error) {
          var timeoutError = new Error('Knex: Timeout acquiring a connection. The pool is probably full. Are you missing a .transacting(trx) call?');
          var additionalErrorInformation = {
            timeoutStack: error.stack
          };

          if (runner.builder) {
            additionalErrorInformation.sql = runner.builder.sql;
            additionalErrorInformation.bindings = runner.builder.bindings;
          }

          (0, _lodash.assign)(timeoutError, additionalErrorInformation);

          rejecter(timeoutError);
        })['catch'](rejecter);
      });
    }).disposer(function () {
      if (runner.connection.__knex__disposed) return;
      runner.client.releaseConnection(runner.connection);
    });
  }

});

module.exports = Runner;