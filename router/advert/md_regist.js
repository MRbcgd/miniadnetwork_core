/*
    author     : bak chulhyong
    created    : 2018 - 09 - 13
    modified   : 2018 - 09 - 13
    description: advert regist functions
*/
const fs = require('fs');

const EQUIP = require('../../common/equip.js');
const LOG   = require('../../common/log.js');
// DIR
const HTML_DIR  = EQUIP.getHtmlDir();

module.exports.FC_LIST = {
    "default": getRegist,
    "add"    : addAdvert,
}
// main page
function getRegist ( req, res ) {
    var dir = HTML_DIR + 'advert/regist.html';

    EQUIP.writePage(dir, 'text/html', res);
    return;
}
function addAdvert ( req, res ) {
    var test = JSON.stringify(req.body)
    console.log("test:", test);
}
