/*
    author     : bak chulhyong
    created    : 2018 - 09 - 16
    modified   : 2018 - 09 - 20
    description: content
*/
const MYSQL = require('./mysql.js');
// select
module.exports.selContent = function ( dbconn, owner, ctt_key ) {
    var sql = "SELECT CTT.ctt_idx "
                 + ", CTT.ctt_status "
              + "FROM tbAContent CTT "
            + "WHERE ctt_key = '" + ctt_key + "'; "
    ;
    return MYSQL.executeQuery(dbconn, owner, sql);
}
