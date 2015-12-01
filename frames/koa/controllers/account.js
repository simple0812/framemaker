var logger = require('../utils/logger');
var jsonHelper = require('../utils/jsonHelper');
var config = require('../config');
var proxy = require('../proxy');
var common = require('../utils/common');
var Promise = require('bluebird');
var _ = require('underscore');
var co = require('co');
var CustomError = require('../utils/customError');

exports.renderLogin = function*() {
  this.body = yield this.render('login');
};

exports.renderRegist = function*() {
  this.body = yield this.render('regist');
};

exports.logout = function*() {
  this.session = null;
  yield this.redirect(config.LOGIN_URL);
}

exports.login = function*() {
  var name = this.query.name;
  var password = this.query.password;
  var _this = this;

  if (!name || name.trim().length === 0) {
    return this.body = yield _this.render('login');
  }
  if (!password || password.trim().length === 0) {
    return this.body = yield _this.render('login');
  }

  yield co(function*() {
    var doc = yield proxy.User.getByName(name);

    if (!doc || doc.id <= 0) {
      throw new CustomError('用户不存在');
    }

    if (doc.password !== password) {
      throw new CustomError('密码不正确');
    }

    _this.session.user = {
      id: doc.id,
      name: doc.userName,
      password: doc.password
    };

    return doc;
  }).then((doc) => {
    _this.body = jsonHelper.getSuccess(doc);
  }).catch((err) => {
    logger.normal.error(err);
    _this.body = jsonHelper.getError(err.message || common.tryStringify(err));
  });
};

exports.regist = function*() {
  var name = this.request.body.name;
  var password = this.request.body.password;
  var _this = this;

  var user = {
    userName: name,
    password: password,
    status: 1
  };

  yield co(function*() {
    var doc = yield proxy.User.getByName(name);
    if (doc && doc.id) {
      throw new CustomError('该用户已存在');
    }
    return yield proxy.User.create(user);
  }).then((doc) => {
    _this.session.user = {
      id: doc.id,
      name: doc.userName,
      password: doc.password
    };

    _this.body = jsonHelper.getSuccess(doc);
  }).catch((err) => {
    logger.normal.error(err);
    _this.body = jsonHelper.getError(err.message);
  })
};