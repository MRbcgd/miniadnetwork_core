/*
    author     : bak chulhyong
    created    : 2018 - 09 - 16
    modified   : 2018 - 09 - 16
    description: targetset
*/
const MYSQL = require('./mysql.js');
// insert
module.exports.insTargetSet = function ( dbconn, owner, ctt_idx, adv_idx,
tgt_code, tgt_class ) {
    var sql = "INSERT "
              + "INTO tbATargetSet ( "
                  + "ctt_idx "
                  + ", adv_idx "
                  + ", tgl_idx "
              + ") "
              + "VALUES ( "
                    + " " + ctt_idx + " "
                    + "," + adv_idx + " "
                    + ", ( "
                        + "SELECT tgl_idx "
                          + "FROM tbATargetList "
                         + "WHERE tgl_class = '" + tgt_class + "' "
                           + "AND tgl_code = '"  + tgt_code  + "' "
                    + ") "
              + "); "
    ;
    return MYSQL.executeQuery(dbconn, owner, sql);
}
