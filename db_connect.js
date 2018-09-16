/*
    author     : bak chulhyong
    created    : 2018 - 09 - 16
    modified   : 2018 - 09 - 16
    description: db connection
*/
const EQUIP  = require('./common/equip.js');
const LOG    = require('./common/log.js');
// MYSQL
const dbAdvert = require('./db/mysql/db_advert/db_advert.js');

dbAdvert.connect('db_advert', function ( err ) {
    if( err != null ) {
        LOG.err(null, "DB Connect Failed. Forced Process Exit:[" + err + "]");
        process.exit();
        return;
    }
    console.log("success");
});
