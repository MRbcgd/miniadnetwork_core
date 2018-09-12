/*
    author     : bak chulhyong
    created    : 2018 - 09 - 12
    modified   : 2018 - 09 - 12
    description: log function
*/
require('./debug.js');
const System = require('os'); // createUserKey 관련
const Fileio = require('fs');
const Util   = require('util');
const Path   = require('path');

var g_logpath = __dirname;
var g_logfile = 'unkown.log';
var g_logdate = null;

module.exports.setLogPath = function(path, name)
{
	path = path || '';
	path = path.trim();
	if( path.length <= 0 )
		path = __dirname + "/.." ;
	g_logpath = path;
    console.log("g_logpath:", g_logpath);
}

function getLogFile()
{
	var now_date = new Date();
	var log_date = now_date.getFullYear()
	   + ('0' + (now_date.getMonth() + 1)).slice(-2)
	   + ('0' + (now_date.getDate())).slice(-2);

	if( g_logdate != log_date ) {
		var run_file = Path.basename(process.argv[1]);
		var run_ext  = Path.extname(run_file);
		var run_name = Path.basename(run_file, run_ext);

		g_logdate = log_date;
		g_logfile = g_logpath + '/' + run_name + '.' + g_logdate + '.log';
		g_logfile = Path.normalize(g_logfile);
		console.log('log_file:' + g_logfile);
	}
	return g_logfile;
}

var g_indexing = 0;
var g_pretime = 0;
function getTraceTime()
{
	if( g_indexing >= 1000000 )
		g_indexing = 0;
	g_indexing++;

	var t_stm = (new Date().getTime()) / 1000;
	// Date,Time
	var t_diff = '';
	if( g_pretime > 0 ) {
		t_diff = t_stm - g_pretime;
	}
	g_pretime = t_stm;
	return (g_indexing + '|' + Number(t_stm).toFixed(3) + ':' + Number(t_diff).toFixed(3));
}

function getTraceOwner(owner)
{
	var rtn = ' ';
	if( owner != null ) {
		if( typeof owner.getObjectId == 'function' ) {
			rtn = owner.getObjectId();
		} else {
			rtn = typeof(owner);
		}
	}
	return rtn;
}

module.exports.log = function(owner)
{
	var text = process.pid + '|' + getTraceTime() + '|' + getTraceOwner(owner);

	// make Body
	var args = Array.prototype.slice.call(arguments);
	args.shift();
	var mesg = Util.format.apply(this, args);

	// make Head
	// text = sprintf('| %-20s | %-6s | %-30s | ', __dfile, __dline, __dfunc);
	text += '|   |' + __dfile + '|' + __dline + '|' + __dfunc + '|' + mesg + '\n';

	Fileio.appendFile(getLogFile(), text, function (err) {
		if (err) {
			return;
		}
	});
}

module.exports.err = function(owner)
{
	var text = process.pid + '|' + getTraceTime() + '|' + getTraceOwner(owner);

	// make Body
	var args = Array.prototype.slice.call(arguments);
	args.shift();
	var mesg = Util.format.apply(this, args);

	// make Head
	// text = sprintf('| %-20s | %-6s | %-30s | ', __dfile, __dline, __dfunc);
	text += '|ERR|' + __dfile + '|' + __dline + '|' + __dfunc + '|' + mesg + '\n';

	// bak. chulhyong add 20171226 log
	Fileio.appendFile(getLogFile(), text, function (err) {
		if (err) {
			return;
		}
	});
}

var g_timeStamp = {};
module.exports.timeStart = function(str_name)
{
	var t_now   = process.hrtime();
	var t_start = t_now[0] + (t_now[1] / 1000000000);

	g_timeStamp[str_name] = t_start;
}

module.exports.timeEnd = function(str_name)
{
	var t_now   = process.hrtime();
	var t_end   = t_now[0] + (t_now[1] / 1000000000);
	var t_start = g_timeStamp[str_name];

	if( t_start == null ) return 0;

	g_timeStamp[str_name] = null;
	var t_ms = Number( (t_end - t_start)*1000 ).toFixed(3);

	return t_ms;
}
