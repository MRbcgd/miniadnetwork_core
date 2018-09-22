/*
    author     : bak chulhyong
    created    : 2018 - 09 - 22
    modified   : 2018 - 09 - 22
    description: banner
*/
const MYSQL = require('./mysql.js');
const UUID  = require('../../../common/uuid.js');
const EQUIP = require('../../../common/equip.js');

// select
module.exports.insBanner = function ( dbconn, owner, ctt_key, adv_key, art_kind ) {
    var sql = "INSERT "
              + "INTO tbABanner ( "
                    + "bnr_key "
                    + ", ctt_key "
                    + ", adv_key "
                    + ", art_kind "
                    + ", bnr_created "
                    + ", bnr_updated "
              + ") "
              + "VALUES ( "
                    + "'"   + UUID.generate64()      + "' "
                    + ", '" + ctt_key                + "' "
                    + ", '" + adv_key                + "' "
                    + ", "  + art_kind               + " "
                    + ", '" + EQUIP.getCurrentTime() + "' "
                    + ", '" + EQUIP.getCurrentTime() + "' "
              + "); "
    ;
    return MYSQL.executeQuery(dbconn, owner, sql);
}
