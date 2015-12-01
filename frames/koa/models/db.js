var Sequelize = require('sequelize');
var config = require('../config');
var Promise = require('bluebird');
var logger = require('../utils/logger');
var common = require('../utils/common');

var koaDemo = new Sequelize(config.DB.database, config.DB.user, config.DB.password, {
  host: config.DB.host,
  dialect: 'mysql',
  pool: {
    max: 50,
    min: 0
  }
});

var redis = Promise.promisifyAll(require('redis'));
var client = redis.createClient(6379, '127.0.0.1', {});

client.on("error", function(err) {
  logger.normal.error('redis Error ->', err.message || common.tryStringify(err));
});

exports.koaDemo = koaDemo;
exports.redis = redis;