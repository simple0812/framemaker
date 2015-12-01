var log4js = require('log4js');
var fs = require('fs');

if (!fs.existsSync('./logs'))
  fs.mkdirSync('./logs');

log4js.configure({
  appenders: [{
    type: 'console'
  }, {
    type: 'file',
    filename: './logs/normal.log',
    category: 'normal',
    maxLogSize: 500 * 1024 * 1024
  }, {
    type: 'file',
    filename: './logs/access.log',
    category: 'access',
    maxLogSize: 500 * 1024 * 1024
  }],
  //'log','debug','info','warn','error'
  "levels": {
    "normal": "info",
    "access": "debug"
  }
});

var normal = log4js.getLogger("normal");
var access = log4js.getLogger("access");
var logger = {};

exports.normal = normal;
exports.access = access;
exports.log4js = log4js;