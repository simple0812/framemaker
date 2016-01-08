var proxy = require('../proxy/');

exports.retrieve = function(req, res, next) {
	res.jsonp({data:'xx'})
};

exports.retrievex = function(req, res, next) {
	res.jsonp({data:'yy'})
};