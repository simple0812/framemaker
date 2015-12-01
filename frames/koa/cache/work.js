var Promise = require('bluebird');
var client = require('./client');
var common = require('../utils/common');
var config = require('../config');
var logger = require('../utils/logger');
var _ = require('underscore');
var moment = require('moment');

//hash
//数据库名称_表名称_uid_month
function createKey(key, month) {
    return common.md5(config.DB.database + "_work_overtime_" + key + "_" + month);
}

exports.set = function(model) {
    var date, day, month, doc;
    if (!(model && model.uid))
        return logger.normal.error("add work_overtime cache failed -> id is null");

    if (model.createdAt) {
        date = new Date(model.createdAt * 1000);
        day = date.getDate();
        month = moment(date).format("YYYY-MM");
        doc = JSON.stringify(model);
    } else {
        day = 0;
        month = model.month;
        doc = "nil";
    }

    client.hsetAsync(createKey(model.uid, month), day, doc).then(function(ret) {
        //console.log(ret);
    }).catch(function(err) {
        logger.normal.error("add work_overtime cache failed -> " + err.message)
    })
};

exports.get = function(uid, month, field) {
    if (!uid || !month || !field) {
        logger.normal.error("del work_overtime cache failed -> id is null");
        return Promise.resolve(null);
    }

    return client.hgetAsync(createKey(uid, month), field).then(function(doc) {
        try {
            return Promise.resolve(JSON.parse(doc));
        } catch (err) {
            logger.normal.err("get work_overtime cache failed ->" + err.message);
            return Promise.reject(err.message);
        }
    })
};

exports.all = function(uid, month) {
    if (!uid || !month) {
        logger.normal.error("del work_overtime cache failed -> id is null");
        return Promise.resolve(null);
    }

    return client.hvalsAsync(createKey(uid, month)).then(function(docs) {
        if (!docs || docs.length == 0) return Promise.resolve(null);
        try {
            var p = [];

            _.each(docs, function(item) {
                if (item !== "nil")
                    p.push(JSON.parse(item));
            });

            return Promise.resolve(p);
        } catch (err) {
            logger.normal.err("get work_overtime cache failed ->" + err.message);
            return Promise.resolve(null);
        }
    })
};