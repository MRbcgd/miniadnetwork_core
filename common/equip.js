/*
    author     : bak chulhyong
    created    : 2018 - 09 - 12
    modified   : 2018 - 09 - 12
    description: common function
*/
const CONFIG   = require('./config.js');
const JSONDATA = ( CONFIG['config'] || null );

const g_project_path = __dirname + '/..';

// CONFIG
module.exports.getConfig = function ( key ) {
    if ( JSONDATA == null  ) return null;

    return ( JSONDATA[key] || null );
}
// DIR
module.exports.getProjectPath = function () {
    return g_project_path;
}
module.exports.getHtmlDir = function () {
    return exports.module.getConfig('html_dir');
}
// HTTP
module.exports.getRequestPublicIP = function( request )
{
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
module.exports.parseURL = function( url_qry )
{
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
