/*
    author     : bak chulhyong
    created    : 2018 - 09 - 16
    modified   : 2018 - 09 - 16
    description: content
*/
const MYSQL = require('./mysql.js');
const UUID  = require('../../../common/uuid.js');

// select
// insert
module.exports.insContent = function ( dbconn, owner, ctt_name,
    ctt_owner, email) {
    var sql = "INSERT "
              + "INTO tbAContent ( "
                    + "ctt_key "
                    + ", ctt_name "
                    + ", ctt_owner "
                    + ", email "
              + ") "
            + "VALUES ( "
                    + "'"  + UUID.generate64() + "' "
                    + ",'" + ctt_name          + "' "
                    + ",'" + ctt_owner         + "' "
                    + ",'" + email             + "' "
            + ") "
    ;
    return MYSQL.executeQuery(dbconn, owner, sql);
}
