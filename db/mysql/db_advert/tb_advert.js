/*
    author     : bak chulhyong
    created    : 2018 - 09 - 16
    modified   : 2018 - 09 - 17
    description: advert
*/
const MYSQL = require('./mysql.js');
const UUID  = require('../../../common/uuid.js');

// select
module.exports.selAdvert = function ( dbconn, owner, adv_status ) {
    var sql = "SELECT adv_idx "
                 + ", adv_link "
                 + ", adv_owner "
                 + ", adv_desc "
                 + ", adv_status "
                 + ", adv_created "
                 + ", adv_updated "
                 + ", used_point "
              + "FROM tbAAdvert "
            + "WHERE adv_status = '" + adv_status + "'; "
    ;
    return MYSQL.executeQuery(dbconn, owner, sql);
}
// insert
module.exports.insAdvert = function ( dbconn, owner, adv_owner, adv_desc,
    adv_link, adv_status ) {
    var sql = "INSERT "
              + "INTO tbAAdvert ( "
                    + "adv_key "
                    + ", adv_owner "
                    + ", adv_desc "
                    + ", adv_link "
                    + ", adv_status "
              + ") "
            + "VALUES ( "
                    + "'"  + UUID.generate64() + "' "
                    + ",'" + adv_owner         + "' "
                    + ",'" + adv_desc          + "' "
                    + ",'" + adv_link          + "' "
                    + ",'" + adv_status        + "' "
            + ") "
    ;
    return MYSQL.executeQuery(dbconn, owner, sql);
}
