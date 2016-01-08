var proxy = require('../proxy/');
var models = require('../models/');
var jsonHelper = require('../utils/jsonHelper');

exports.render = function(req, res, next) {
	res.render('article')
}

exports.retrieve = function(req, res, next) {
	proxy.Article.retrieve().then(function(data) {
		res.json(jsonHelper.getSuccess(data))
	})
};

exports.create = function(req, res, next) {
	proxy.Article.create(req.body).then(function(data) {
		res.json(jsonHelper.getSuccess(data))
	})
};

exports.update = function(req, res, next) {
	proxy.Article.update(req.body).then(function(data) {
		res.json(jsonHelper.getSuccess(data))
	})
};

exports.delete = function(req, res, next) {
	proxy.Article.delete(req.body).then(function(data) {
		res.json(jsonHelper.getSuccess(data))
	})
};

exports.page = function(req, res) {
    var opts = req.query || {};
    var pageSize = opts.pageSize;
    var pageIndex = opts.pageIndex;
    var firNum = (pageIndex - 1) * pageSize;
    var uid = opts.uid; //格式 ”2015-06“
    var keyword = opts.keyword; //格式 ”2015-06“
    var criteria = {};

    if (uid) {
        criteria.uid = uid;
    }

    if (keyword) {
        criteria.title = {
            $like : '%'+req.query.keyword+'%'
        };
    }
    
    return models.Article.findAndCount({
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

        res.json(jsonHelper.pageSuccess(docs.rows, docs.count))
    });
};