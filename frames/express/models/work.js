var db = require('./db');
var Sequelize = require('sequelize');
var common = require('../utils/common');

var WorkOvertime = db.define('workOvertime', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  uid: {
    type: Sequelize.INTEGER,
    defaultValue: 0

  },
  userName: {
    type: Sequelize.STRING(50),
    field: 'user_name',
    defaultValue: ''

  },
  remark: {
    type: Sequelize.STRING(2000),
    defaultValue: ''
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  createdAt: {
    type: Sequelize.INTEGER,
    field: 'created_at'
  }

}, {
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  tableName: 'work_overtime'
});

WorkOvertime.hook('beforeCreate', function(model, options, fn) {
  model.createdAt || (model.createdAt = common.getTime());
  fn(null, model);
});

module.exports = WorkOvertime;