/*
    author     : bak chulhyong
    created    : 2018 - 09 - 14
    modified   : 2018 - 09 - 22
    description: banner functions
*/
const fs = require('fs');

const EQUIP = require('../../common/equip.js');
const LOG   = require('../../common/log.js');
const dbAdvert = require('../../db/mysql/db_advert/db_advert.js');

// DIR
const HTML_DIR  = EQUIP.getHtmlDir();

module.exports.FC_LIST = {
    "default"   : returnDefault,
    "getBanner" : getBanner    ,
}

function returnDefault ( req, res ) {
    EQUIP.returnClient('INVALID_URL', res, null);
    return;
}
function getBanner ( req, res ) {
    try {
        JSON.parse(req.body)
    } catch (e) {
        EQUIP.returnClient('INVALID_INPUT_DATA', res, null);
        return;
    }
    var data = JSON.parse(req.body);
    var self = this;

    self.req      = req;
    self.res      = res;
    self.ctt_key  = data.ctt_key  || null;
    self.art_kind = data.art_kind || null;

    if ( ctt_key == null ) {
        EQUIP.returnClient('INVALILD_CTT_KEY', res, null);
        return;
    }
    if ( art_kind == null || art_kind != 1 ) {
        EQUIP.returnClient('INVALID_ART_KIND', res, null);
        return;
    }

    dbAdvert.tbContent.selContent(null, self, self.ctt_key).then(function ( values ) {
        var self = values.self;
        var err  = values.err;
        var rows = values.rows;

        if ( err != null ) {
            if ( err.code != 'WN_NO_DATA' ) {
                LOG.err(self, 'SELECT CONTENT FAILD:[' + err + ']');
                EQUIP.returnClient('ITN_SVR_ERR', res, null);
                return;
            }
        }

        if ( rows.length <= 0 ) {
            EQUIP.returnClient('INVALID_CTT_KEY', res, null);
            return;
        }

        var record     = rows[0];
        var ctt_idx    = record['ctt_idx'];
        var ctt_status = record['ctt_status'];

        if ( ctt_status != 'P' ) {
            EQUIP.returnClient('CTT_NOT_PLAYING', res, null);
            return;
        }

        dbAdvert.tbAdvert.selAdvert(null, self, ctt_idx).then(onSelAdvert);
        return;
    });
}

function onSelAdvert ( values ) {
    var self = values.self;
    var err  = values.err;
    var rows = values.rows;
    var req = self.req;
    var res = self.res;

    if ( err != null ) {
        if ( err.code != 'WN_NO_DATA' ) {
            LOG.err(self, 'SELECT ADVERT FAILD:[' + err + ']');
            EQUIP.returnClient('ITN_SVR_ERR', res, null);
            return;
        }
    }

    var record = {};
    self.adv_idx   = null;
    self.adv_key   = null;
    self.adv_owner = null;
    self.adv_desc  = null;
    self.adv_link  = null;

    // empty adv
    if ( rows.length <= 0 ) {
        self.adv_owner = EQUIP.getDBConfig('def_adv_owner');
        self.adv_desc  = EQUIP.getDBConfig('def_adv_desc');
        self.adv_link  = EQUIP.getDBConfig('def_adv_link');
    } else {
        record = rows[0];
        self.adv_idx   = record['adv_idx'];
        self.adv_key   = record['adv_key'];
        self.adv_owner = record['adv_owner'];
        self.adv_desc  = record['adv_desc'];
        self.adv_link  = record['adv_link'];
    }

    var dir = HTML_DIR + 'banner/art_kind_' + self.art_kind + '.html';

    fs.readFile(dir, "utf8", function ( ferr, data ) {
        if ( ferr != null ) {
            LOG.err(self, 'File Read FAILD:[' + ferr + ']');
            EQUIP.returnClient('ITN_SVR_ERR', res, null);
            return;
        }
        data = data.replace('$$ADV_OWNER$$', self.adv_owner);
        data = data.replace('$$ADV_DESC$$' , self.adv_desc);
        data = data.replace('$$ADV_LINK$$' , self.adv_link);

        data = data.split('\n').join('');
        data = data.split('\r').join('');

        self.data = data

        if ( self.adv_key == null ) {
            EQUIP.returnClient('SUCCESS', res, data);
            return;
        }

        exposedAdvert(self);
        return;
    });
}
function exposedAdvert ( self ) {
    dbAdvert.beginTransaction(self).then(function ( values ) {
        var self = values.self;
        var err  = values.err;
        var conn = values.conn;
        var res  = self.res;

        if( err != null ) {
            LOG.err(self, 'Database Connection Lost');
            EQUIP.returnClient('ITN_SVR_ERR', res, null);
            return;
        }

        dbAdvert.tbAdvert.updAdvertExposed(conn, self, self.adv_idx).then(function ( avalues ) {
                var self = avalues.self;
                var err  = avalues.err;

                if( err != null ) {
                    LOG.err(self, 'UPDATE ADVERT FAILD:[' + err + ']');
                    EQUIP.returnClient('ITN_SVR_ERR', res, null);
                    dbAdvert.endTransaction(values, err);
                    return;
                }

                dbAdvert.tbBanner.insBanner(conn, self, self.ctt_key,
                    self.adv_key, self.art_kind).then(function ( bvalues ) {
                         var self = bvalues.self;
                         var err  = bvalues.err;

                         if( err != null ) {
                             LOG.err(self, 'INSERT BANNER FAILD:[' + err + ']');
                             EQUIP.returnClient('ITN_SVR_ERR', res, null);
                             dbAdvert.endTransaction(values, err);
                             return;
                         }

                         dbAdvert.endTransaction(values, null);
                         EQUIP.returnClient('SUCCESS', res, self.data);
                         return;
                });
        });
        return;
    });
}
