/*
    author     : bak chulhyong
    created    : 2018 - 09 - 13
    modified   : 2018 - 09 - 13
    description: main functions
*/
const fs = require('fs');

const LOG   = require('../../common/log.js');
const EQUIP = require('../../common/test.js');
// DIR
const HTML_DIR  = EQUIP.getHtmlDir();

module.exports.FC_LIST = {
    "default": "getMain",
}
// main page
module.exports.getMain = function ( req, res ) {
    var dir = HTML_DIR + 'main/index.html';

    EQUIP.writePage(dir, res);
    return;
}
