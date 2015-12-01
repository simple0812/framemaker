var common = require('./utils/common');

var commonConfig = {
  ROOT: __dirname,
  PORT: 3003,
  EXCEL_PATH : __dirname + "/public/download",
  LOG_PATH : __dirname + "/logs",

  LOGIN_URL:'/login/v',
  NEED_AUTH_URL : [
    '/workOvertime/v'
  ],

  REDIS: {
    port:6379,
    host : '127.0.0.1'
  }
};

var development = {
  SIGN_SECRET_KEY: '123456',
  DB : {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'koa_demo',
    connectionLimit: 50,
    multipleStatements: true
  }
};

var production = {
  SIGN_SECRET_KEY: 'c85e4c825d61b4328eb0aae659e4a177',
  DB : {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'koa_demo',
    connectionLimit: 50,
    multipleStatements: true
  }
};

var env = process.env.NODE_ENV || 'production';
var config = env == 'development' ? common.deepClone(development) : common.deepClone(production);

for (var each in config) {
  commonConfig[each] = config[each];
}

module.exports = commonConfig;