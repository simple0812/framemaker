var proxy = require('../proxy/');
var models = require('../models/');
var jsonHelper = require('../utils/jsonHelper');

exports.render = function(req, res, next) {
	res.render('user')
}

exports.retrieve = function(req, res, next) {
	proxy.User.retrieve().then(function(data) {
		res.json(jsonHelper.getSuccess(data))
	})
};

exports.create = function(req, res, next) {
	proxy.User.create(req.body).then(function(data) {
		res.json(jsonHelper.getSuccess(data))
	})
};

exports.update = function(req, res, next) {
	proxy.User.update(req.body).then(function(data) {
		res.json(jsonHelper.getSuccess(data))
	})
};

exports.delete = function(req, res, next) {
	proxy.User.delete(req.body).then(function(data) {
		res.json(jsonHelper.getSuccess(data))
	})
};

exports.page = function(req, res, next) {
    var pageSize = req.query.pageSize;
    var pageIndex = req.query.pageIndex;
    var firNum = (pageIndex - 1) * pageSize;
    var criteria = {};
    if(req.query.keyword) {
        criteria.userName = {
            $like : '%'+req.query.keyword+'%'
        };
    }

    return models.User.findAndCount({
        where: criteria,
        limit: pageSize,
        offset: firNum,
        order: [
            ['created_at', 'DESC']
        ]
    }).then(function(docs) {
        res.json(jsonHelper.pageSuccess(docs.rows, docs.count))
    });
};
