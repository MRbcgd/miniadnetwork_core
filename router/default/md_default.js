/*
    author     : bak chulhyong
    created    : 2018 - 09 - 13
    modified   : 2018 - 09 - 20
    description: default functions
*/
const fs = require('fs');

const EQUIP = require('../../common/equip.js');
const LOG   = require('../../common/log.js');
// DIR
const HTML_DIR  = EQUIP.getHtmlDir();

module.exports.FC_LIST = {
    "default": returnDefault,
}
// main page
function returnDefault ( req, res ) {
    EQUIP.returnClient('INVALID_URL', res, null);
    return;
}
