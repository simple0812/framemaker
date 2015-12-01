var Promise = require("bluebird");
var config = require('../config');
var logger = require('../utils/logger');

var redis = Promise.promisifyAll(require('redis'));
var client = redis.createClient(config.REDIS.port, config.REDIS.host, {});

client.on("error", function(err) {
  logger.normal.error("redis error ->" + err.message);
});

module.exports = client;