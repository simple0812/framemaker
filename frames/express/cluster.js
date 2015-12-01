var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
//负载均衡

if (cluster.isMaster) {
	require('os').cpus().forEach(function() {
		cluster.fork().on('message', function(msg) {
			// console.log(msg);
		});
	});
	cluster.on('exit', function(worker, code, signal) {
		// console.log('worker ' + worker.process.pid + ' died');
	});
	cluster.on('listening', function(worker, address) {
		//console.log("A worker with #" + worker.id + " is now connected to " + address.address + ":" + address.port);
	});
} else {
	require('./app');
}