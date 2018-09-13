/*
    author     : bak chulhyong
    created    : 2018 - 09 - 12
    modified   : 2018 - 09 - 12
    description: main
*/
const http    = require('http');
const cluster = require('cluster');

const EQUIP  = require('./common/equip.js');
const LOG    = require('./common/log.js');

// LOG
const LOG_PATH = EQUIP.getLogDir();
LOG.setLogPath(LOG_PATH);

// SERVER
const SERVER = require('./socket_server.js');

var g_is_shutdown   = false; // grcaefulshutdown

function gracefulShutdown () {
    LOG.log(null, '###############################################');
	LOG.log(null, "[gracefulShutdown READY]");
    LOG.log(null, '###############################################');

	if( g_is_shutdown == true ) return;
	g_is_shutdown = true;

	SERVER.stopServer();

	setTimeout(function() {
        LOG.log(null, '###############################################');
        LOG.log(null, "[gracefulShutdown DONE]");
        LOG.log(null, '###############################################');

		process.exit();
	}, 30*1000); // forcefully shut down 30s later
}

function setProcess ( child ) {
	child.on('warning', function(warning) {
		console.warn("[CHILD] " + warning.name);    // Print the warning name
		console.warn("[CHILD] " + warning.message); // Print the warning message
		console.warn("[CHILD] " + warning.stack);   // Print the stack LOG
	});
	child.on('unhandledRejection', function(reason, p) {
		LOG.err(null, "[CHILD] Unhandled Rejection at: Promise", p, ' reason:', reason);
		console.error('[unhandledRejection] Promise', p, ' reason:', reason);
		child.exit(-2);
	});
	child.on('uncaughtException', function(err) {
		LOG.err(null, "[CHILD] Caught exception: ", err, ' stack:', err.stack);
		console.error('[uncaughtException]', err);
		child.exit(-1);
	});
	child.on('SIGTERM', function() {
		LOG.log(null, "[CHILD] Caught SIGTERM");
		console.log('[SIGTERM]');
		gracefulShutdown();
	});
	child.on('SIGINT', function() {
		LOG.log(null, "[CHILD] Caught SIGINT");
		console.log('[SIGTERM]');
		gracefulShutdown();
	});
	child.on('exit', function(code) {
		LOG.log(null, "[CHILD] About to exit with code:[" + code + "]");
	});
}

// CLUSTERING
if( cluster.isMaster ) {
	LOG.log(null, '###############################################');
	LOG.log(null, '# RUNNING [PID:' + process.pid + ']');
	LOG.log(null, '###############################################');

	// Fork workers.
    var numCPUs = require('os').cpus().length;
    for( var i = 0; i < numCPUs; i++ ) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
		LOG.log(null, '# WORKER [PID:' + worker.process.pid + '] ONLINE');
    });

    cluster.on('exit', function(worker, code, signal) {
		LOG.err(null, '# WORKER [PID:' + worker.process.pid + '] DIED[' + code + ',' + signal + ']');
		cluster.fork();
    });
} else {
	setProcess(process);

    // CHILD
	LOG.log(null, '-----------------------------------------------');
	LOG.log(null, '- Running [PID:' + process.pid + ']');
	LOG.log(null, '-----------------------------------------------');

    SERVER.runServer();
}
