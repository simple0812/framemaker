var Router = require('koa-router');
var ctrl = require('../controllers/work');

module.exports = function(app, prefix) {
	prefix = prefix || '';
	var opt = prefix ? {prefix : prefix} : {};
	var router = Router(opt);


	router.get('/v', ctrl.render);
	router.get('/users/v', ctrl.renderUsers);

	router.get('/users', ctrl.pageByUsers);
	router.get('/:id', ctrl.getById);
	router.get('/', ctrl.getByMonth);
	router.post('/', ctrl.create);

	app
		.use(router.routes())
	  .use(router.allowedMethods());
};