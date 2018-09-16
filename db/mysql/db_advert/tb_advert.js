/*
    author     : bak chulhyong
    created    : 2018 - 09 - 16
    modified   : 2018 - 09 - 16
    description: advert
*/
const MYSQL = require('./mysql.js');
const UUID  = require('../../../common/uuid.js');

// select
// insert
module.exports.insAdvert = function ( dbconn, owner, adv_owner, adv_desc ) {
    var sql = "INSERT "
              + "INTO tbAAdvert ( "
                    + "adv_key "
                    + ", adv_owner "
                    + ", adv_desc "
              + ") "
            + "VALUES ( "
                    + "'"  + UUID.generate64() + "' "
                    + ",'" + adv_owner          + "' "
                    + ",'" + adv_desc         + "' "
            + ") "
    ;
    return MYSQL.executeQuery(dbconn, owner, sql);
}
