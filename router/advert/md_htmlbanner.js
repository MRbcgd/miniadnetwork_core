/*
    author     : bak chulhyong
    created    : 2018 - 09 - 14
    modified   : 2018 - 09 - 14
    description: banner functions
*/
const fs = require('fs');

const EQUIP = require('../../common/equip.js');
const LOG   = require('../../common/log.js');
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
    EQUIP.returnClient('SUCCESS', res, null);
    console.log("getBanner");
    return;
}
