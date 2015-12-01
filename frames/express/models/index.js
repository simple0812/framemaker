var WorkOvertime = require('./work');
var User = require('./user');

var db = require('./db');

User.hasMany(WorkOvertime, {foreignKey : 'uid'});
WorkOvertime.belongsTo(User, {foreignKey : 'uid'});

db.sync().then(function() {
    console.log('数据库同步成功')
}).catch(function(err) {
    console.log(err, '数据库同步失败')
})

exports.WorkOvertime = WorkOvertime;
exports.User = User;