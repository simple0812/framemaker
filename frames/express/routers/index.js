module.exports = function (app) {
	app.use(require('./foo'));
	app.use(require('./user'));
	app.use(require('./article'));
}
