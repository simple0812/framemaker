var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var numProcess = numCPUs > 4 ? 4 : numCPUs;
var accessCount = 0;

if (cluster.isMaster) {
  for (var i = 0; i < numProcess; i++) {
    cluster.fork().on('message', function (msg) {
      accessCount ++;

    });
  }
  cluster.on('exit', function (worker, code, signal) {
    logger.normal.error('crash error -> worker ' + worker.process.pid + ' died');
    process.exit('crash error');
  });

  cluster.on('listening', function (worker, address) {
    console.log("A worker with #" + worker.id + " is now connected to " + (address.address || 'localhost') + ":" + address.port);
  });
} else {
  require('./app');
}