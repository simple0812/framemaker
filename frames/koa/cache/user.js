var Promise = require('bluebird');
var client = require('./client');
var common = require('../utils/common');
var config = require('../config');
var logger = require('../utils/logger');
var CustomEvent = require("../utils/customError");

//string
//数据库名称_表名称_key
function createKey(key) {
  return common.md5(config.DB.database + "_user_" + key);
}

exports.set = function(model) {
  if(!(model && model.userName))
    return logger.normal.error("add user cache failed -> id is null");

  client.setAsync(createKey(model.userName), JSON.stringify(model)).then(function(ret) {
    //console.log(ret);
  }).catch(function(err) {
    logger.normal.error("add user cache failed -> " + err.message)
  })
};

exports.del = function(key) {
  if(!key)
    return logger.normal.error("del user cache failed -> id is null");

  client.delAsync(createKey(key)).catch(function(err) {
    logger.normal.error("del user cache failed -> " + err.message)
  })
};

exports.get = function(key) {
  if(!key) {
    logger.normal.error("del user cache failed -> id is null");
    return Promise.reject( new CustomEvent("获取缓存失败"));
  }

  return client.getAsync(createKey(key)).then(function(doc) {
    try {
      return Promise.resolve(JSON.parse(doc));
    } catch (err) {
      logger.normal.err("get user cache failed ->" + err.message);
      return Promise.reject(err.message);
    }
  })
};