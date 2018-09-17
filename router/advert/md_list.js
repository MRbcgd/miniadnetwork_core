/*
    author     : bak chulhyong
    created    : 2018 - 09 - 17
    modified   : 2018 - 09 - 17
    description: advert list functions
*/
const fs = require('fs');

const EQUIP    = require('../../common/equip.js');
const LOG      = require('../../common/log.js');
const dbAdvert = require('../../db/mysql/db_advert/db_advert.js');
// DIR
const HTML_DIR  = EQUIP.getHtmlDir();

module.exports.FC_LIST = {
    "default"       : getList      ,
    "selAdvertList" : selAdvertList,
}
// main page
function getList ( req, res ) {
    var dir = HTML_DIR + 'advert/list.html';

    EQUIP.writePage(dir, 'text/html', res);
    return;
}
function selAdvertList ( req, res ) {
    var data        = JSON.parse(req.body);
    var self        = this;

    self.adv_status = ( data.adv_status || '' );
    var byte_len = EQUIP.byteCheck(self.adv_status);

    if ( byte_len < 0 && byte_len > 1 ) {
        EQUIP.returnClient('BYTE_LEN_ERR', res, null);
        return;
    }

    dbAdvert.tbAdvert.selAdvert(null, self, self.adv_status).then(function ( values ) {
        var self = values.self;
        var err  = values.err;
        var rows = values.rows;

        if ( err != null ) {
            if ( err.code != 'WN_NO_DATA' ) {
                LOG.err(self, 'SELECT ADVERT FAILD:[' + err + ']');
                EQUIP.returnClient('ITN_SVR_ERR', res, null);
                return;
            }
        }

        EQUIP.returnClient('SUCCESS', res, rows);
        return;
    });
}
