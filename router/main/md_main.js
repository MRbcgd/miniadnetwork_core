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

module.exports.get_main = function ( req, res ) {
    fs.readFile(HTML_DIR + 'main', 'utf8', function( ferr, data ) {
		if( ferr != null ) {
            LOG.err(null, '', ferr);
            return;
        }

		return;
	});
}
