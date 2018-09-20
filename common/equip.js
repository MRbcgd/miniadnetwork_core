/*
    author     : bak chulhyong
    created    : 2018 - 09 - 12
    modified   : 2018 - 09 - 16
    description: common function
*/
const fs = require('fs');

const CONFIG = require('./config.js');
const ERROR  = require('./error.js');
const JSON_DATA   = ( CONFIG['config'] || null );
const ERROR_DATA  = ( ERROR['error']   || null );

const G_PRJ_PATH = ( __dirname + '/..' );

// CONFIG
module.exports.getConfig = function ( key ) {
    if ( JSON_DATA == null  ) return null;

    return ( JSON_DATA[key] || null );
}
// DIR
module.exports.getProjectPath = function () {
    return G_PRJ_PATH;
}
module.exports.getLogDir = function () {
    return module.exports.getProjectPath() + module.exports.getConfig('log_dir');
}
module.exports.getHtmlDir = function () {
    return module.exports.getProjectPath() + module.exports.getConfig('html_dir');
}
module.exports.getAssetDir = function () {
    return module.exports.getProjectPath() + module.exports.getConfig('asset_dir');
}
// HTTP
module.exports.getRequestPublicIP = function( request ) {
	var cli_ip = '';

	if( request.headers['x-forwarded-for'] ) {
		cli_ip = request.headers['x-forwarded-for'] || '';
		cli_ip = (cli_ip.split(",") || [])[0];
	}
	else if( request.headers['x-real-ip'] ) {
		cli_ip = request.headers['x-real-ip'] || '';
		cli_ip = (cli_ip.split(",") || [])[0];
	}
	else if( request.connection && request.connection.remoteAddress ) {
		cli_ip = request.connection.remoteAddress || '';
		cli_ip = (cli_ip.split(':') || [ null, null, null, null, ])[3];
	}
	else if( request.socket && request.socket.remoteAddress ) {
		cli_ip = request.socket.remoteAddress || '';
		cli_ip = (cli_ip.split(':') || [ null, null, null, null, ])[3];
	}

	return cli_ip;
}
module.exports.returnClient = function ( code, res, data ) {
    var result = {
        "code"  : ERROR_DATA[code],
        "data"  : data            ,
    }
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('charset', 'utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Max-Age', '2520');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Requested-With, Session');
    res.setHeader('Access-Control-Expose-Headers', 'DAV, content-length, Allow');
    res.setHeader('Cache-Control', 'no-cache,no-store');
    res.setHeader('Connection', 'close');

    res.writeHead(200);
    res.write(JSON.stringify(result));
    res.end();
    return;
}
module.exports.parseURL = function( url_qry ) {
	var rtn    = {};
    var items  = {};

	url_qry = (url_qry || '').trim();

	var arr_params = url_qry.split('?') || [];
	var arr_path = arr_params[0].split('://') || [];

	if( arr_path.length >= 2 ) {
		rtn.proto = arr_path[0];
		rtn.url   = arr_path[1] || '';
	} else {
		rtn.url   = arr_path[0] || '';
	}

	var fields = rtn.url.split('/') || [];
	if( rtn.url.substr(0, 1) != '/' ) rtn.host = fields[0];

	fields.shift();
	rtn.arr_path = fields;
	rtn.path = '/' + fields.join('/');

	rtn.query = arr_params[1] || '';
	if( rtn.query != null ) {
	    rtn.query.split('&').forEach( function(item) {
	        var parts = item.split('=') || [];
			name  = parts[0] ? parts[0].trim() : '';
	        value = parts[1] ? parts[1].trim() : '';
	        items[name] = value;
	    });
	}
	rtn.item = items;

    return rtn;
}
// FILE
module.exports.writePage = function ( dir, type, res ) {
    fs.readFile(dir, 'utf8', function( ferr, data ) {
		if( ferr != null ) {
            LOG.err(null, '[FERROR]: ', ferr);
            return;
        }

        res.setHeader('Content-Type', type);
        res.setHeader('charset', 'utf-8');
        res.write(data);
        res.end();
		return;
	});
}
// Validity
// ORG: http://cofs.tistory.com/267 [CofS]
module.exports.byteCheck = function ( el ) {
    var codeByte = 0;
    for (var idx = 0; idx < el.length; idx++) {
        var oneChar = escape(el.charAt(idx));
        if ( oneChar.length == 1 ) {
            codeByte ++;
        } else if (oneChar.indexOf("%u") != -1) {
            codeByte += 2;
        } else if (oneChar.indexOf("%") != -1) {
            codeByte ++;
        }
    }
    return codeByte;
}
// date
module.exports.getCurrentTime = function () {
    var date = new Date ();
    var full_year    = date.getFullYear();
    var full_month   = ('0' + (date.getMonth() + 1)).slice(-2);
    var full_date    = ('0' + (date.getDate())).slice(-2);
    var full_hours   = ('0' + (date.getHours())).slice(-2);
    var full_minutes = ('0' + (date.getMinutes())).slice(-2);
    var full_seconds = ('0' + (date.getSeconds())).slice(-2);

    return full_year + '-' + full_month + '-' + full_date + " " + full_hours + ":" + full_minutes + ":" + full_seconds;

}
