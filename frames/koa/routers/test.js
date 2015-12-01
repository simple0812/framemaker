var Router = require('koa-router');

module.exports = function(app, prefix) {
  prefix = prefix || '';
  var opt = prefix ? {prefix : prefix} : {};
  var router = Router(opt);

  router.get('/', function* (next) {
    this.body = yield this.render('index');
  })

  router.get('/foo', function* (next) {
    this.body = "test foo";
  })

  app
    .use(router.routes())
    .use(router.allowedMethods());
};