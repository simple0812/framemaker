var models = require('../models/');
var config = require('../config');
var logger = require('../utils/logger');
var Promise = require('bluebird');
var moment = require('moment');
var db = require('../models/db');

exports.update = function(model) {
    return models.WorkOvertime.update(model, {
        where: {
            id: model.id
        }
    });
};

exports.create = function(model) {
    return models.WorkOvertime.create(model).then(function(doc) {
        cache.WorkOvertime.set(doc.dataValues);
        return Promise.resolve(doc);
    });
};

exports.delete = function(ids) {
    return models.WorkOvertime.destroy({
        where: {
            id: ids
        }
    });
};

exports.retrieve = function(opts) {
    var criteria = opts || {};
    return models.WorkOvertime.all({
        where: criteria
    });
};


exports.page = function(opts) {
    var pageSize = opts.pageSize;
    var pageIndex = opts.pageIndex;
    var firNum = (pageIndex - 1) * pageSize;
    var month = opts.month; //格式 ”2015-06“
    var uid = opts.uid; //格式 ”2015-06“
    var criteria = {};

    if (month) {
        var startTime = new Date(month);
        startTime.setHours(0);
        startTime = parseInt(startTime.getTime() / 1000);

        var endTime = moment(new Date(month)).add(1, 'month').format('YYYY-MM');
        endTime = new Date(endTime);
        endTime.setHours(0);
        endTime = parseInt(endTime.getTime() / 1000);

        criteria.created_at = {
            $gte: startTime,
            $lt: endTime
        };
    }

    if (uid) {
        criteria.uid = uid;
    }

    return models.WorkOvertime.findAndCount({
        where: criteria,
        limit: pageSize,
        offset: firNum,
        order: [
            ['created_at', 'DESC']
        ]
    }).then(function(docs) {
        var json = {};
        json.recordCount = docs.count;
        json.result = [];
        docs.rows.forEach(function(item) {
            json.result.push(item.dataValues);
        });

        return Promise.resolve(json);
    });
};

exports.getById = function(id) {
    return models.WorkOvertime.all({
        where: {
            id: id
        }
    });
};
