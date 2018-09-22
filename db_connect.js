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

    dbAdvert.tbConfig.selConfig(null, null).then(function ( values ) {
        var err  = values.err;
        var rows = values.rows;

        if ( err != null ) {
            if ( err.code != 'WN_NO_DATA' ) {
                LOG.err(null, 'SELECT CONFIG FAILD:[' + err + ']');
                process.exit();
                return;
            }
        }

        var record    = null;
        var cfg_name  = null;
        var cfg_value = null;
        var cfg_data  = {};
        for (var data = 0; data < rows.length; data++) {
            record    = rows[data];
            cfg_name  = record['cfg_name']  || '';
            cfg_value = record['cfg_value'] || '';

            cfg_data[cfg_name] = cfg_value;
        }

        EQUIP.setDBConfig(cfg_data);
        return;
    });
});
