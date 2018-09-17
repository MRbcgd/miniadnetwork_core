/*
    author     : bak chulhyong
    created    : 2018 - 09 - 17
    modified   : 2018 - 09 - 17
    description: content list functions
*/
const fs = require('fs');

const EQUIP    = require('../../common/equip.js');
const LOG      = require('../../common/log.js');
const dbAdvert = require('../../db/mysql/db_advert/db_advert.js');
// DIR
const HTML_DIR  = EQUIP.getHtmlDir();

module.exports.FC_LIST = {
    "default"       : getList       ,
    "selContentList": selContentList,
}
// main page
function getList ( req, res ) {
    var dir = HTML_DIR + 'content/list.html';

    EQUIP.writePage(dir, 'text/html', res);
    return;
}
function selContentList ( req, res ) {
    var data        = JSON.parse(req.body);
    var self        = this;

    self.ctt_status = ( data.ctt_status || '' );
    var byte_len = EQUIP.byteCheck(self.ctt_status);

    if ( byte_len < 0 && byte_len > 1 ) {
        EQUIP.returnClient('BYTE_LEN_ERR', res, null);
        return;
    }

    dbAdvert.tbContent.selContent(null, self, self.ctt_status).then(function ( values ) {
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

        EQUIP.returnClient('SUCCESS', res, rows);
        return;
    });
}
