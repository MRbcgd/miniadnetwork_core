/*
    author     : bak chulhyong
    created    : 2018 - 09 - 22
    modified   : 2018 - 09 - 22
    description: config
*/
const MYSQL = require('./mysql.js');
// select
module.exports.selConfig = function ( dbconn, owner ) {
    var sql = "SELECT cfg_name "
                 + ", cfg_value "
              + "FROM tbEConfig;"
    ;
    return MYSQL.executeQuery(dbconn, owner, sql);
}
