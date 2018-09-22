/*
    author     : bak chulhyong
    created    : 2018 - 09 - 16
    modified   : 2018 - 09 - 22
    description: advert
*/
const MYSQL = require('./mysql.js');
const EQUIP = require('../../../common/equip.js');

// select
module.exports.selAdvert = function ( dbconn, owner, ctt_idx ) {
    var sql  = "SELECT ADV.adv_idx "
                  + ", ADV.adv_key "
                  + ", ADV.adv_owner "
            	  + ", ADV.adv_desc "
            	  + ", ADV.adv_link "
               + "FROM tbAAdvert ADV "
               // ADVERT GENDER
              + "INNER JOIN ( "
                    + "SELECT TGS.adv_idx "
                         + ", TGL.tgl_code "
                      + "FROM tbATargetSet TGS "
                     + "INNER JOIN tbATargetList TGL ON TGL.tgl_idx = TGS.tgl_idx "
                            + "AND TGL.tgl_class = 'G' "
                     + "WHERE TGS.adv_idx <> 0 "
              + ") ATGG ON ATGG.adv_idx = ADV.adv_idx "
              // CONTENT GENDER
              + "INNER JOIN ( "
                    + "SELECT TGL.tgl_code "
                      + "FROM tbATargetSet TGS "
                     + "INNER JOIN tbAContent CTT ON TGS.ctt_idx = CTT.ctt_idx "
                            + "AND CTT.ctt_idx = " + ctt_idx + " "
                    + "INNER JOIN tbATargetList TGL ON TGS.tgl_idx = TGL.tgl_idx "
                           + "AND TGL.tgl_class = 'G' "
              + ") CTGG ON CTGG.tgl_code = ATGG.tgl_code "
                     + "OR ( "
                         + "CASE WHEN CTGG.tgl_code = 'A' THEN ( ATGG.tgl_code = 'M' OR ATGG.tgl_code = 'W' ) "
                              + "WHEN ATGG.tgl_code = 'A' THEN ( CTGG.tgl_code = 'M' OR CTGG.tgl_code = 'W' ) "
                              + "ELSE 0 "
                         + "END "
                        + ") "
              // ADVERT AGE
              + "INNER JOIN ( "
                    + "SELECT TGS.adv_idx "
                         + ", TGL.tgl_code "
                      + "FROM tbATargetSet TGS "
                      + "INNER JOIN tbATargetList TGL ON TGL.tgl_idx = TGS.tgl_idx "
                             + "AND TGL.tgl_class = 'A' "
                     + "WHERE TGS.adv_idx <> 0 "
              +") ATGA ON ATGA.adv_idx = ADV.adv_idx "
              // CONTENT AGE
              + "INNER JOIN ( "
                    + "SELECT TGL.tgl_code "
                      + "FROM tbATargetSet TGS "
                      + "INNER JOIN tbAContent CTT ON TGS.ctt_idx = CTT.ctt_idx "
                             + "AND CTT.ctt_idx = " + ctt_idx + " "
                      + "INNER JOIN tbATargetList TGL ON TGS.tgl_idx = TGL.tgl_idx "
                             + "AND TGL.tgl_class = 'A' "
              +") CTGA ON CTGA.tgl_code = ATGA.tgl_code "
                    + "OR ( "
                        + "CASE WHEN CTGA.tgl_code = 'A' THEN ( "
                               + "ATGA.tgl_code = '0' "
                            + "OR ATGA.tgl_code = '1' "
                            + "OR ATGA.tgl_code = '2' "
                            + "OR ATGA.tgl_code = '3' "
                            + "OR ATGA.tgl_code = '4' "
                       + ") "
                             + "WHEN ATGA.tgl_code = 'A' THEN ( "
                                  + "CTGA.tgl_code = '0' "
                               + "OR CTGA.tgl_code = '1' "
                               + "OR CTGA.tgl_code = '2' "
                               + "OR CTGA.tgl_code = '3' "
                               + "OR CTGA.tgl_code = '4' "
                               + ") "
                             + "ELSE 0 "
                        + "END "
                    + ") "
              + "WHERE ADV.adv_status = 'P' "
              + "ORDER BY adv_exposed ASC "
              + "LIMIT 1;"
    ;

    return MYSQL.executeQuery(dbconn, owner, sql);
}
// UPDATE
module.exports.updAdvertExposed = function ( dbconn, owner, adv_idx ) {
    var sql = "UPDATE tbAAdvert "
               + "SET adv_exposed = '" + EQUIP.getCurrentTime() + "' "
             + "WHERE adv_idx = " + adv_idx + "; "
    ;
    return MYSQL.executeQuery(dbconn, owner, sql);
}
