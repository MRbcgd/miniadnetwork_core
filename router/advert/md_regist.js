/*
    author     : bak chulhyong
    created    : 2018 - 09 - 13
    modified   : 2018 - 09 - 20
    description: advert regist functions
*/
const fs = require('fs');

const EQUIP = require('../../common/equip.js');
const LOG   = require('../../common/log.js');
const dbAdvert = require('../../db/mysql/db_advert/db_advert.js');
// DIR
const HTML_DIR  = EQUIP.getHtmlDir();

module.exports.FC_LIST = {
    "default"       : getRegist    ,
    "add"           : addAdvert    ,
    "selTargetList" : selTargetList,
}
// main page
function getRegist ( req, res ) {
    var dir = HTML_DIR + 'advert/regist.html';

    EQUIP.writePage(dir, 'text/html', res);
    return;
}
function addAdvert ( req, res ) {
    var data        = JSON.parse(req.body);
    var self        = this;
    var rows        = {};
    var byte_len    = 0;
    var isByte      = true;

    for ( var key in data ) {
        byte_len = EQUIP.byteCheck(( data[key] || '' ));

        if ( key == 'adv_owner'  && (byte_len > 0 && byte_len <= 64)  ) continue;
        if ( key == 'email'      && (byte_len > 0 && byte_len <= 64)  ) continue;
        if ( key == 'adv_desc'   && (byte_len > 0 && byte_len <= 128) ) continue;
        if ( key == 'adv_link'   && (byte_len > 0 && byte_len <= 512) ) continue;
        if ( key == 'tgt_gender' && (byte_len > 0 && byte_len <= 2) ) continue;
        if ( key == 'tgt_age'    && (byte_len > 0 && byte_len <= 2) ) continue;

        isByte = false;
    }

    if ( isByte == false ) {
        LOG.err(self, "Invalid Data Byte Length");
        EQUIP.returnClient('BYTE_LEN_ERR', res, null);
        return;
    }

    self.adv_owner  = data.adv_owner;
    self.email      = data.email;
    self.adv_desc   = data.adv_desc;
    self.adv_link   = data.adv_link;
    self.tgt_gender = data.tgt_gender;
    self.tgt_age    = data.tgt_age;
    // bak chulhyong add 20180917 temporary data
    self.adv_status = 'P';

    dbAdvert.beginTransaction(self).then(function ( values ) {
        var self = values.self;
        var err  = values.err;
        var conn = values.conn;
        if( err != null ) {
            LOG.err(self, 'Database Connection Lost');
            EQUIP.returnClient('ITN_SVR_ERR', res, null);
            return;
        }

        // insert content
        dbAdvert.tbAdvert.insAdvert(conn, self, self.adv_owner, self.email,
        self.adv_desc, self.adv_link, self.adv_status).then(function ( cvalues ) {
                var self = cvalues.self;
                var err  = cvalues.err;

                if ( err != null ) {
                    LOG.err(self, 'INSERT ADVERT FAILD:[' + err + ']');
                    dbAdvert.endTransaction(values, err);
                    EQUIP.returnClient('ITN_SVR_ERR', res, null);
                    return;
                }

                self.adv_idx = cvalues.rows.insertId;
                dbAdvert.tbTargetSet.insTargetSet(conn, self, 0, self.adv_idx,
                    self.tgt_gender, 'G').then(function ( gvalues ) {
                        var self = gvalues.self;
                        var err  = gvalues.err;

                        if ( err != null ) {
                            LOG.err(self, 'INSERT TARGET FAILD[' + err + ']');
                            dbAdvert.endTransaction(values, err);
                            EQUIP.returnClient('ITN_SVR_ERR', res, null);
                            return;
                        }

                        dbAdvert.tbTargetSet.insTargetSet(conn, self, 0,
                             self.adv_idx, self.tgt_age, 'A').then(function ( avalues ) {
                                var self = avalues.self;
                                var err  = avalues.err;

                                if ( err != null ) {
                                    LOG.err(self, 'INSERT TARGET FAILD');
                                    dbAdvert.endTransaction(values, err);
                                    EQUIP.returnClient('ITN_SVR_ERR', res, null);
                                    return;
                                }
                                dbAdvert.endTransaction(values, null);
                                EQUIP.returnClient('SUCCESS', res, null);
                                return;
                        });
                });
        });
    });
}
function selTargetList ( req, res ) {
    dbAdvert.tbTargetList.selTargetList(null, null).then(function ( values ) {
        var self = values.self;
        var err  = values.err;
        var rows = values.rows;

        if ( err != null ) {
            if ( err.code != 'WN_NO_DATA') EQUIP.returnClient('ITN_SVR_ERR', res, rows);
            else  EQUIP.returnClient('TGL_EMPTY', res, rows);

            return;
        }

        EQUIP.returnClient('SUCCESS', res, rows);
        return;
    });
}
