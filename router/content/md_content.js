/*
    author     : bak chulhyong
    created    : 2018 - 09 - 14
    modified   : 2018 - 09 - 14
    description: content functions
*/
const fs = require('fs');

const EQUIP = require('../../common/equip.js');
const LOG   = require('../../common/log.js');
// DIR
const HTML_DIR  = EQUIP.getHtmlDir();

module.exports.FC_LIST = {
    "default": getContent,
}
// main page
function getContent ( req, res ) {
    var dir = HTML_DIR + 'content/index.html';

    EQUIP.writePage(dir, 'text/html', res);
    return;
}
