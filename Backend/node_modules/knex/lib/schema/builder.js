'use strict';

var _lodash = require('lodash');

// Constructor for the builder instance, typically called from
// `knex.builder`, accepting the current `knex` instance,
// and pulling out the `client` and `grammar` from the current
// knex instance.

var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;
function SchemaBuilder(client) {
  this.client = client;
  this._sequence = [];
  this._debug = client.config && client.config.debug;
}
inherits(SchemaBuilder, EventEmitter);

// Each of the schema builder methods just add to the
// "_sequence" array for consistency.
(0, _lodash.each)(['createTable', 'createTableIfNotExists', 'createSchema', 'createSchemaIfNotExists', 'dropSchema', 'dropSchemaIfExists', 'createExtension', 'createExtensionIfNotExists', 'dropExtension', 'dropExtensionIfExists', 'table', 'alterTable', 'hasTable', 'hasColumn', 'dropTable', 'renameTable', 'dropTableIfExists', 'raw'], function (method) {
  SchemaBuilder.prototype[method] = function () {
    if (method === 'table') method = 'alterTable';
    this._sequence.push({
      method: method,
      args: (0, _lodash.toArray)(arguments)
    });
    return this;
  };
});

require('../interface')(SchemaBuilder);

SchemaBuilder.prototype.withSchema = function (schemaName) {
  this._schema = schemaName;
  return this;
};

SchemaBuilder.prototype.toString = function () {
  return this.toQuery();
};

SchemaBuilder.prototype.toSQL = function () {
  return this.client.schemaCompiler(this).toSQL();
};

module.exports = SchemaBuilder;