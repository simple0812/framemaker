var koa = require('koa');
var path = require('path');
var logger = require('./utils/logger');
var common = require('./utils/common');
var views = require('co-views');
var config = require('./config');
var session = require('koa-generic-session');
var redisStore = require('koa-redis');
var _ = require('underscore');
var jsonHelper = require('./utils/jsonHelper');

var app = koa();
app.name = 'koa-session-test';
app.keys = ['koa', 'demo'];
var env = process.env.NODE_ENV || 'production';

app.use(require('koa-static')(path.join(__dirname, env === 'development' ? 'public' : 'static')));
app.use(require('koa-bodyparser')());

app.use(session({
	store: redisStore({
		host: config.REDIS.host,
		port: config.REDIS.port
	})
}));

app.use(function*(next) {
	var start = new Date;
	var _this = this;
	this.render = views(__dirname + "/views", {
		default: 'ejs'
	})._xbind(this, {
		error: "",
		user: _this.session.user || {}
	});
	var pathName = this.req.url.split('?')[0];

	if (pathName !== config.LOGIN_URL && config.NEED_AUTH_URL.indexOf(pathName) !== -1) {
		if (!this.session.user || !this.session.user.id) {
			console.log('x');
			this.redirect(config.LOGIN_URL);
		}
	}

	yield next;

	var ms = new Date - start;
	var workId = require('cluster').worker ? require('cluster').worker.id : -1;
	logger.access.info("%s %s - %sms - workId -> %d", this.method, this.url, ms, workId);
});

require('./routers')(app);

app.use(function*() {
	this.body = jsonHelper.getError("您访问的资源不存在");
});

app.listen(config.PORT, () => {
	console.log("listening on port " + config.PORT + " ,env " + env);
});