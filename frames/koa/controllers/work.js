var logger = require('../utils/logger');
var jsonHelper = require('../utils/jsonHelper');
var config = require('../config');
var proxy = require('../proxy');
var common = require('../utils/common');
var Promise = require('bluebird');
var fs = require('fs');
var _ = require('underscore');
var co = require('co');

exports.render = function*() {
  this.body = yield this.render('workOvertime/index');
};

exports.renderUsers = function*() {
  this.body = yield this.render('workOvertime/users');
};

exports.getByMonth = function*(next) {
  var month = this.query.month || '';
  var uid = this.query.uid || '';
  var _this = this;

  if (!uid) {
    return this.body = jsonHelper.getError('uid参数不能为空');
  }

  var opts = {
    month: month,
    uid: uid
  };

  yield co(function*() {
    return yield proxy.WorkOvertime.getByMonth(opts);
  }).then((docs) => {
    _this.body = jsonHelper.pageSuccess(docs.result, docs.recordCount);
  }).catch(err => {
    _this.body = jsonHelper.getError(err);
  })
};

exports.pageByUsers = function*(next) {
  var pageSize = common.tryParse(this.query.pagesize, 10);
  var pageIndex = common.tryParse(this.query.pageindex, 1);
  if (!pageSize || pageSize <= 0) {
    pageSize = 10;
  }
  if (!pageIndex || pageIndex < 0) {
    pageIndex = 1;
  }

  var month = this.query.month || '';
  var uid = this.query.uid || '';
  var orderMode = this.query.orderMode || 1;
  var orderBy = this.query.orderBy || 'id';
  var _this = this;

  var opts = {
    pageSize: pageSize,
    pageIndex: pageIndex,
    month: month,
    uid: uid,
    orderMode: orderMode,
    orderBy: orderBy
  };

  yield co(function*() {
    return yield proxy.WorkOvertime.pageByUsers(opts);
  }).then((docs) => {
    _this.body = jsonHelper.pageSuccess(docs.result, docs.recordCount);
  }).catch(err => {
    logger.normal.error(err);
    _this.body = jsonHelper.getError(err);
  })
};

exports.getById = function*(next) {
  var id = this.params.id;
  var _this = this;

  if (!id) return this.body = jsonHelper.getError('id参数不能为空');

  yield co(function*() {
    return yield proxy.WorkOvertime.getById(id);
  }).then((docs) => {
    _this.body = jsonHelper.getSuccess(docs)
  }).catch(err => {
    _this.body = jsonHelper.getError(err);
  });
};

exports.create = function*(next) {
  var model = this.request.body;
  var _this = this;
  model.createdAt || (model.createdAt = common.getTime());

  if ((model.createdAt + '').length > 10) {
    model.createdAt = parseInt(model.createdAt / 1000);
  }

  var p = model.createdAt * 1000;
  // if(new Date(p).getHours() < 20)
  //   return this.body = jsonHelper.getError('20:00后才能开始加班');

  yield co(function*() {
    var a = yield proxy.WorkOvertime.countByDate(model.uid, p).then((count) => {
      if (count > 0) {
        return Promise.reject('打卡失败,您已经打过卡');
      }
      return Promise.resolve(model);
    });

    var b = proxy.WorkOvertime.create(a);
    return yield b;

  }).then((docs) => {
    _this.body = jsonHelper.getSuccess(docs);
  }).catch(err => {
    _this.body = jsonHelper.getError(err);
  })
};
