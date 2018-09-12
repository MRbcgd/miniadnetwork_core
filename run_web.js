/*
    author     : bak chulhyong
    created    : 2018 - 09 - 12
    modified   : 2018 - 09 - 12
    description: main
*/
const http = require('http');

const EQUIP  = require('./common/equip.js');
const LOG    = require('./common/log.js');

// LOG
const LOG_DIR  = EQUIP.getConfig('log_dir');
const PRJ_PATH = EQUIP.getProjectPath();
const LOG_PATH = LOG_DIR + PRJ_PATH;
LOG.setLogPath(LOG_PATH);

// SERVER
const SERVER = require('./server.js');
