module.exports = function(app) {
  require('./work')(app, '/workOvertime');
  require('./account')(app);
  require('./test')(app);
};