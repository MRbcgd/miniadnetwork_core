/*
    author     : bak chulhyong
    created    : 2018 - 09 - 14
    modified   : 2018 - 09 - 16
    description: content regist functions
*/
const fs = require('fs');

const EQUIP    = require('../../common/equip.js');
const LOG      = require('../../common/log.js');
const dbAdvert = require('../../db/mysql/db_advert/db_advert.js');
// DIR
const HTML_DIR  = EQUIP.getHtmlDir();

module.exports.FC_LIST = {
    "default"       : getRegist    ,
    "add"           : addContent   ,
    "selTargetList" : selTargetList,
}
// main page
function getRegist ( req, res ) {
    var dir = HTML_DIR + 'content/regist.html';

    EQUIP.writePage(dir, 'text/html', res);
    return;
}
function addContent ( req, res ) {
    var data        = JSON.parse(req.body);
    var self        = this;
    var rows        = {};

    var byte_len = 0;
    var isByte = true;
    for ( var key in data ) {
        byte_len = EQUIP.byteCheck(( data[key] || '' ));

        if ( key == 'ctt_name'   && (byte_len > 0 && byte_len <= 64) ) continue;
        if ( key == 'ctt_owner'  && (byte_len > 0 && byte_len <= 64) ) continue;
        if ( key == 'email'      && (byte_len > 0 && byte_len <= 64) ) continue;
        if ( key == 'tgt_gender' && (byte_len > 0 && byte_len <= 2)  ) continue;
        if ( key == 'tgt_age'    && (byte_len > 0 && byte_len <= 2)  ) continue;

        isByte = false;
    }

    if ( isByte == false ) {
        LOG.err(self, "Invalid Data Byte Length");
        EQUIP.returnClient('BYTE_LEN_ERR', res, null);
        return;
    }

    self.ctt_name   = data.ctt_name;
    self.ctt_owner  = data.ctt_owner;
    self.email      = data.email;
    self.tgt_gender = data.tgt_gender;
    self.tgt_age    = data.tgt_age;

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
        dbAdvert.tbContent.insContent(conn, self, self.ctt_name, self.ctt_owner,
            self.email).then(function ( cvalues ) {
                var self = cvalues.self;
            	var err  = cvalues.err;

                if ( err != null ) {
                    LOG.err(self, 'INSERT CONTENT FAILD:[' + err + ']');
                    dbAdvert.endTransaction(values, err);
                    EQUIP.returnClient('ITN_SVR_ERR', res, null);
                    return;
                }

                self.ctt_idx = cvalues.rows.insertId;
                dbAdvert.tbTargetSet.insTargetSet(conn, self, self.ctt_idx, 0,
                    self.tgt_gender, 'G').then(function ( gvalues ) {
                        var self = gvalues.self;
                        var err  = gvalues.err;

                        if ( err != null ) {
                            LOG.err(self, 'INSERT TARGET FAILD[' + err + ']');
                            dbAdvert.endTransaction(values, err);
                            EQUIP.returnClient('ITN_SVR_ERR', res, null);
                            return;
                        }

                        dbAdvert.tbTargetSet.insTargetSet(conn, self, self.ctt_idx, 0,
                            self.tgt_age, 'A').then(function ( avalues ) {
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
    return;
}
function selTargetList ( req, res ) {
    dbAdvert.tbTargetList.selTargetList(null, null).then(function ( values ) {
        var self = values.self;
        var err  = values.err;
        var rows = values.rows;

        if ( err != null ) {
            if ( err.code != 'WN_NO_DATA') {
                LOG.err(self, 'INTERNAL SERVER ERROR:[' + err + ']');
                EQUIP.returnClient('ITN_SVR_ERR', res, rows);
            }
            else {
                LOG.err(self, 'TargetList Empty');
                EQUIP.returnClient('TGL_EMPTY', res, rows);
            }

            return;
        }

        EQUIP.returnClient('SUCCESS', res, rows);
        return;
    });
}
