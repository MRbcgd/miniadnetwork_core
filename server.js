/*
    author     : bak chulhyong
    created    : 2018 - 09 - 12
    modified   : 2018 - 09 - 13
    description: server
*/
const fs   = require('fs');
const http = require('http');
const url  = require('url');

const LOG    = require('./common/log.js');
const EQUIP  = require('./common/equip.js');

// HTTP
const PORT = EQUIP.getConfig('port') || 8080;

var g_server = null; // SERVER

function onServerRecvAfter( req, res )
{
    LOG.log(null, "RECEIVED URL: " + req.url);

    var url_qry  = EQUIP.parseURL(req.url);
	var url_obj  = null;

    if ( url_qry.arr_path == null ) url_qry.arr_path = [];

    EQUIP.getModule(url_qry.arr_path)(req, res);
    return;
}
function onServerAccepted(req, res)
{
	LOG.log(null, "####################################################################");
	LOG.log(null, "[CLIENT] " + EQUIP.getRequestPublicIP(req));
    LOG.log(null, "####################################################################");

	if( req.method == 'POST' ) {
		LOG.log(null, "[METHOD]: POST");

		var body = '';
		// Chainning
		req.on('data', function (data) {
			body += data;
			if (body.length > 1e6) {
				req.connection.destroy();
			}
		});
		req.on('end', function () {
			req.body = body;
			onServerRecvAfter(req, res);
		});
	} else {
		LOG.log(null, "[METHOD]: GET");
		onServerRecvAfter(req, res);
	}
}

module.exports.runServer = function() {
    g_server = http.createServer();

	g_server.on('close', function( err, socket ) {
		LOG.log(null, "[SERVER] onClose");
	});

	g_server.on('connection', function( socket ) {
		var addr_ip   = socket.remoteAddress;
		var addr_port = socket.remotePort;
		LOG.log(null, "[SERVER] onAccepted [" + addr_ip + ":" + addr_port + "]");

		socket.addr_ip   = addr_ip;
		socket.addr_port = addr_port;

		socket.on('close', function( socket ) {
			LOG.log(null, "[SOCKET] onClosed [" + addr_ip + ":" + addr_port + "]");
		});
	});

	g_server.on('request', onServerAccepted);

	g_server.on('clientError', (err, socket) => {
		socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');

		var addr_ip   = socket.remoteAddress;
		var addr_port = socket.remotePort;

		LOG.err(null, "[SERVER] CLIENT ERROR [" + addr_ip + ":" + addr_port + "]");
	});

	g_server.listen(PORT);

    console.log("SERVER RUNNING AT PORT: " + PORT);
	LOG.log(null, "SERVER RUNNING AT PORT: " + PORT);
}

module.exports.stopServer = function() {
    if( g_server != null ) {
        g_server.close(function() {
            LOG.log(null, "SERVER STOPED, CLOSED CONNECTIONS");
            process.exit();
        });
    }
}
