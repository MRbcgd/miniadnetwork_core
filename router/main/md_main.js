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
const HTML_DIR  = EQUIP.getHtmlDir();

module.exports.FC_LIST = {
    "default": getMain,
}
// main page
function getMain ( req, res ) {
    var dir = HTML_DIR + 'main/index.html';

    EQUIP.writePage(dir, 'text/html', res);
    return;
}
