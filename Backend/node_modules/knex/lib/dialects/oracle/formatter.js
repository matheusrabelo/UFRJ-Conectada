'use strict';

var _lodash = require('lodash');

var inherits = require('inherits');
var Formatter = require('../../formatter');
var ReturningHelper = require('./utils').ReturningHelper;

function Oracle_Formatter(client) {
  Formatter.call(this, client);
}
inherits(Oracle_Formatter, Formatter);

(0, _lodash.assign)(Oracle_Formatter.prototype, {

  alias: function alias(first, second) {
    return first + ' ' + second;
  },

  parameter: function parameter(value, notSetValue) {
    // Returning helper uses always ROWID as string
    if (value instanceof ReturningHelper && this.client.driver) {
      value = new this.client.driver.OutParam(this.client.driver.OCCISTRING);
    } else if (typeof value === 'boolean') {
      value = value ? 1 : 0;
    }
    return Formatter.prototype.parameter.call(this, value, notSetValue);
  }

});

module.exports = Oracle_Formatter;