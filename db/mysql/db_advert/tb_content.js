/*
    author     : bak chulhyong
    created    : 2018 - 09 - 16
    modified   : 2018 - 09 - 20
    description: content
*/
const MYSQL = require('./mysql.js');
const UUID  = require('../../../common/uuid.js');

// select
module.exports.selContent = function ( dbconn, owner, ctt_status ) {
    var sql = "SELECT CTT.ctt_idx "
                 + ", ctt_key "
                 + ", ctt_name "
                 + ", ctt_owner "
                 + ", email "
                 + ", ctt_status "
                 + ", ctt_created "
                 + ", ctt_updated "
                 + ", mini_point "
                 + ", TGLSG.tgl_code gender_code "
                 + ", TGLSA.tgl_code age_code "
              + "FROM tbAContent CTT "
              + "INNER JOIN ( "
                    + "SELECT TGS.ctt_idx "
                         + ", TGL.tgl_code "
                    + "FROM tbATargetList TGL "
                    + "INNER JOIN tbATargetSet TGS ON TGS.tgl_idx = TGL.tgl_idx "
                    + "WHERE TGS.ctt_idx <> 0 "
                      + "AND TGL.tgl_class = 'G' "
              + ") TGLSG ON TGLSG.ctt_idx = CTT.ctt_idx "
              + "INNER JOIN ( "
                    + "SELECT TGS.ctt_idx "
                         + ", TGL.tgl_code "
                    + "FROM tbATargetList TGL "
                    + "INNER JOIN tbATargetSet TGS ON TGS.tgl_idx = TGL.tgl_idx "
                    + "WHERE TGS.ctt_idx <> 0 "
                      + "AND TGL.tgl_class = 'A' "
              + ") TGLSA ON TGLSA.ctt_idx = CTT.ctt_idx "
            + "WHERE ctt_status = '" + ctt_status + "'; "
    ;
    return MYSQL.executeQuery(dbconn, owner, sql);
}
// insert
module.exports.insContent = function ( dbconn, owner, ctt_name,
    ctt_owner, email, ctt_status) {
    var sql = "INSERT "
              + "INTO tbAContent ( "
                    + "ctt_key "
                    + ", ctt_name "
                    + ", ctt_owner "
                    + ", email "
                    + ", ctt_status "
              + ") "
            + "VALUES ( "
                    + "'"  + UUID.generate64() + "' "
                    + ",'" + ctt_name          + "' "
                    + ",'" + ctt_owner         + "' "
                    + ",'" + email             + "' "
                    + ",'" + ctt_status        + "' "
            + ") "
    ;
    return MYSQL.executeQuery(dbconn, owner, sql);
}
