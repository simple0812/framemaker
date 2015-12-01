var Router = require('koa-router');
var ctrl = require('../controllers/account');

module.exports = function(app, prefix) {
  prefix = prefix || '';
  var opt = prefix ? {prefix : prefix} : {};
  var router = Router(opt);


  router.get('/', ctrl.renderLogin);
  router.get('/login/v', ctrl.renderLogin);
  router.get('/regist/v', ctrl.renderRegist);

  router.get('/login', ctrl.login);
  router.post('/regist', ctrl.regist);
  router.get('/logout', ctrl.logout);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};