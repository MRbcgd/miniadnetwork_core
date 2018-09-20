/*
    author     : bak chulhyong
    created    : 2018 - 09 - 16
    modified   : 2018 - 09 - 20
    description: advert
*/
const MYSQL = require('./mysql.js');
const UUID  = require('../../../common/uuid.js');

// select
module.exports.selAdvert = function ( dbconn, owner, adv_status ) {
    var sql = "SELECT ADV.adv_idx "
                 + ", adv_link "
                 + ", adv_owner "
                 + ", email "
                 + ", adv_desc "
                 + ", adv_status "
                 + ", adv_created "
                 + ", adv_updated "
                 + ", used_point "
                 + ", TGLSG.tgl_code gender_code "
                 + ", TGLSA.tgl_code age_code "
              + "FROM tbAAdvert ADV "
              + "INNER JOIN ( "
                    + "SELECT TGS.adv_idx "
                         + ", TGL.tgl_code "
                    + "FROM tbATargetList TGL "
                    + "INNER JOIN tbATargetSet TGS ON TGS.tgl_idx = TGL.tgl_idx "
                    + "WHERE TGS.adv_idx <> 0 "
                      + "AND TGL.tgl_class = 'G' "
              + ") TGLSG ON TGLSG.adv_idx = ADV.adv_idx "
              + "INNER JOIN ( "
                    + "SELECT TGS.adv_idx "
                         + ", TGL.tgl_code "
                    + "FROM tbATargetList TGL "
                    + "INNER JOIN tbATargetSet TGS ON TGS.tgl_idx = TGL.tgl_idx "
                    + "WHERE TGS.adv_idx <> 0 "
                      + "AND TGL.tgl_class = 'A' "
              + ") TGLSA ON TGLSA.adv_idx = ADV.adv_idx "
            + "WHERE adv_status = '" + adv_status + "'; "
    ;
    return MYSQL.executeQuery(dbconn, owner, sql);
}
// insert
module.exports.insAdvert = function ( dbconn, owner, adv_owner, email, adv_desc,
    adv_link, adv_status ) {
    var sql = "INSERT "
              + "INTO tbAAdvert ( "
                    + "adv_key "
                    + ", adv_owner "
                    + ", email "
                    + ", adv_desc "
                    + ", adv_link "
                    + ", adv_status "
              + ") "
            + "VALUES ( "
                    + "'"  + UUID.generate64() + "' "
                    + ",'" + adv_owner         + "' "
                    + ",'" + email             + "' "
                    + ",'" + adv_desc          + "' "
                    + ",'" + adv_link          + "' "
                    + ",'" + adv_status        + "' "
            + ") "
    ;
    return MYSQL.executeQuery(dbconn, owner, sql);
}
