/*
    author     : bak chulhyong
    created    : 2018 - 09 - 12
    modified   : 2018 - 09 - 12
    description: common function
*/
const CONFIG   = require('./config.js');
const JSONDATA = ( CONFIG['config'] || null );

const g_project_path = __dirname + '/..';

module.exports.getProjectPath = function () {
    return g_project_path;
}
module.exports.getConfig = function ( key ) {
    if ( JSONDATA == null  ) return null;
    
    return ( JSONDATA[key] || null );
}
module.exports.getHtmlDir = function () {
    return exports.module.getConfig('html_dir');
}
