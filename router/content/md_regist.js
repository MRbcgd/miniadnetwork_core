/*
    author     : bak chulhyong
    created    : 2018 - 09 - 14
    modified   : 2018 - 09 - 14
    description: content regist functions
*/
const fs = require('fs');

const EQUIP = require('../../common/equip.js');
const LOG   = require('../../common/log.js');
// DIR
const HTML_DIR  = EQUIP.getHtmlDir();

module.exports.FC_LIST = {
    "default": getRegist,
    "add"    : addContent,
}
// main page
function getRegist ( req, res ) {
    var dir = HTML_DIR + 'content/regist.html';

    EQUIP.writePage(dir, 'text/html', res);
    return;
}
function addContent ( req, res ) {
    var test = JSON.stringify(req.body)
    console.log("test:", test);
}
