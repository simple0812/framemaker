var models = require('../models/');
var config = require('../config');
var logger = require('../utils/logger');
var Promise = require('bluebird');
var moment = require('moment');
var db = require('../models/db');
var cache = require('../cache/');

exports.update = function(model) {
  return models.WorkOvertime.update(model, {
    where: {
      id: model.id
    }
  });
};

exports.create = function(model) {
  return models.WorkOvertime.create(model).then(function(doc) {
    cache.WorkOvertime.set(doc.dataValues);
    return Promise.resolve(doc);
  });
};

exports.delete = function(ids) {
  return models.WorkOvertime.destroy({
    where: {
      id: ids
    }
  });
};

exports.retrieve = function(opts) {
  var criteria = opts || {};
  return models.WorkOvertime.all({
    where: criteria
  });
};

exports.countByDate = function(uid, date) {
  var p = moment(new Date(date)).format('YYYY-MM-DD');
  var x = new Date(p);
  x.setHours(0);

  var startTime = parseInt(x.getTime() / 1000);
  var endTime = startTime + 24 * 60 * 60;

  return models.WorkOvertime.count({
    where: {
      uid: uid,
      created_at: {
        $gte: startTime,
        $lt: endTime
      }
    }
  });
};

exports.page = function(opts) {
  var pageSize = opts.pageSize;
  var pageIndex = opts.pageIndex;
  var firNum = (pageIndex - 1) * pageSize;
  var month = opts.month; //格式 ”2015-06“
  var uid = opts.uid; //格式 ”2015-06“
  var criteria = {};

  if (month) {
    var startTime = new Date(month);
    startTime.setHours(0);
    startTime = parseInt(startTime.getTime() / 1000);

    var endTime = moment(new Date(month)).add(1, 'month').format('YYYY-MM');
    endTime = new Date(endTime);
    endTime.setHours(0);
    endTime = parseInt(endTime.getTime() / 1000);

    criteria.created_at = {
      $gte: startTime,
      $lt: endTime
    };
  }

  if (uid) {
    criteria.uid = uid;
  }

  return models.WorkOvertime.findAndCount({
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

    return Promise.resolve(json);
  });
};

exports.getByMonth = function(opts) {
  var month = opts.month; //格式 ”2015-06“
  var uid = opts.uid; //格式 ”2015-06“
  var criteria = {};

  if (!month) {
    month = moment().format('YYYY-MM');
  }

  var startTime = new Date(month);
  startTime.setHours(0);
  startTime = parseInt(startTime.getTime() / 1000);

  var endTime = moment(new Date(month)).add(1, 'month').format('YYYY-MM');
  endTime = new Date(endTime);
  endTime.setHours(0);
  endTime = parseInt(endTime.getTime() / 1000);

  criteria.created_at = {
    $gte: startTime,
    $lt: endTime
  };
  criteria.uid = uid;

  return cache.WorkOvertime.all(uid, month).then(function(docs) {
    var json = {};
    if (docs) {
      json.recordCount = docs.count;
      json.result = docs;
      return Promise.resolve(json);
    }

    return models.WorkOvertime.findAndCount({
      where: criteria,
      order: [
        ['created_at', 'DESC']
      ]
    }).then(function(docs) {
      json.recordCount = docs.count;
      json.result = [];
      if (docs.rows.length === 0) {
        cache.WorkOvertime.set({
          uid: uid,
          month: month
        });
      }

      docs.rows.forEach(function(item) {
        cache.WorkOvertime.set(item.dataValues);
        json.result.push(item.dataValues);
      });

      return Promise.resolve(json);
    });
  });
};

exports.getById = function(id) {
  return models.WorkOvertime.all({
    where: {
      id: id
    }
  });
};

exports.pageByUsers = function(opts) {
  var pageSize = opts.pageSize;
  var pageIndex = opts.pageIndex;
  var firNum = (pageIndex - 1) * pageSize;
  var month = opts.month; //格式 ”2015-06“
  var uid = opts.uid; //格式 ”2015-06“
  var json = {};

  var countSql = 'select count (*) as recordCount from ( select * from work_overtime where 1 = 1  ';
  var pageSql = 'select *, sum(status) as times  from work_overtime where 1 = 1 ';

  if (month) {
    var startTime = new Date(month);
    startTime.setHours(0);
    startTime = parseInt(startTime.getTime() / 1000);

    var endTime = moment(new Date(month)).add(1, 'month').format('YYYY-MM');
    endTime = new Date(endTime);
    endTime.setHours(0);
    endTime = parseInt(endTime.getTime() / 1000);


    countSql += ' and created_at between ' + startTime + ' and ' + endTime;
    pageSql += ' and created_at between ' + startTime + ' and ' + endTime;
  }

  countSql += ' group by uid ) x';
  pageSql += '  group by uid  order by uid asc limit ' + firNum + ', ' + pageSize;

  return new Promise(function(resolve, reject) {
    db.koaDemo.query(countSql, {
      type: db.koaDemo.QueryTypes.SELECT
    }).then(function(count) {
      json.recordCount = count[0].recordCount;
      return db.koaDemo.query(pageSql, {
        type: db.koaDemo.QueryTypes.SELECT
      }).then(function(docs) {
        json.result = docs;
        resolve(json);
      });
    }).catch(function(err) {
      reject(err);
    });
  });
};

exports.pageOfUserOvertime = function(opts) {
  var pageSize = opts.pageSize;
  var pageIndex = opts.pageIndex;
  var firNum = (pageIndex - 1) * pageSize;
  var month = opts.month; //格式 ”2015-06“
  var uid = opts.uid; //格式 ”2015-06“
  var criteria = {};

  if (month) {
    var startTime = new Date(month);
    startTime.setHours(0);
    startTime = parseInt(startTime.getTime() / 1000);

    var endTime = moment(new Date(month)).add(1, 'month').format('YYYY-MM');
    endTime = new Date(endTime);
    endTime.setHours(0);
    endTime = parseInt(endTime.getTime() / 1000);

    criteria.created_at = {
      $gte: startTime,
      $lt: endTime
    };
  }

  if (uid) {
    criteria.uid = uid;
  }

  return models.WorkOvertime.findAndCount({
    where: criteria,
    limit: pageSize,
    offset: firNum,
    order: [
      ['created_at', 'asc']
    ]
  }).then(function(docs) {
    var json = {};
    json.recordCount = docs.count;
    json.result = [];
    docs.rows.forEach(function(item) {
      json.result.push(item.dataValues);
    });

    return Promise.resolve(json);
  });
};

exports.exportByExcel = function(month) {
  if (!month) {
    month = moment().format('YYYY-MM');
  }

  var criteria = {};
  var startTime = new Date(month);
  startTime.setHours(0);
  startTime = parseInt(startTime.getTime() / 1000);

  var endTime = moment(new Date(month)).add(1, 'month').format('YYYY-MM');
  endTime = new Date(endTime);
  endTime.setHours(0);
  endTime = parseInt(endTime.getTime() / 1000);

  criteria.created_at = {
    $gte: startTime,
    $lt: endTime
  };

  return models.WorkOvertime.findAll({
    where: criteria,
    order: [
      ['uid', 'asc']
    ]
  });
};