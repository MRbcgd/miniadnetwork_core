/*
    author     : bak chulhyong
    created    : 2018 - 09 - 13
    modified   : 2018 - 09 - 13
    description: main functions
*/
const fs = require('fs');

const EQUIP = require('../../common/equip.js');
const LOG   = require('../../common/log.js');
// DIR
const HTML_DIR = EQUIP.getHtmlDir();
const ASST_DIR = EQUIP.getAssetDir();

module.exports.FC_LIST = {
    "default": getMain  ,
    "common" : getCommon,
    "advert" : getAdvert,
}
// main page
function getMain ( req, res ) {
    var dir = HTML_DIR + 'main/index.html';

    EQUIP.writePage(dir, 'text/html', res);
    return;
}
function getCommon ( req, res ) {
    var dir = ASST_DIR + 'javascript/common.js';

    EQUIP.writePage(dir, 'text/javascript', res);
    return;
}
function getAdvert ( req, res ) {
    var dir = ASST_DIR + 'javascript/advert.js';

    EQUIP.writePage(dir, 'text/javascript', res);
    return;
}
