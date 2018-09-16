/*
    author     : bak chulhyong
    created    : 2018 - 09 - 16
    modified   : 2018 - 09 - 16
    description: dbAdvert
*/
const MYSQL = require('./mysql.js');

module.exports.connect          = MYSQL.connect;
module.exports.executeQuery     = MYSQL.executeQuery;
module.exports.beginTransaction = MYSQL.beginTransaction;
module.exports.endTransaction   = MYSQL.endTransaction;
module.exports.ERR              = MYSQL.ERR;

// module.exports.tbBannerRun = require("./tb_config.js");
module.exports.tbContent    = require("./tb_content.js");
module.exports.tbAdvert     = require("./tb_advert.js");
// module.exports.tbBannerRun = require("./tb_banner.js");
module.exports.tbTargetList = require("./tb_targetlist.js");
module.exports.tbTargetSet  = require("./tb_targetset.js");
