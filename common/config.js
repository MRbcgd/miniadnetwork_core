/*
    author     : bak chulhyong
    created    : 2018 - 09 - 12
    modified   : 2018 - 09 - 16
    description: config file
*/
module.exports.config = {
    "port"     : process.env.PORT,
    "html_dir" : "/view/html/"   ,
    "asset_dir": "/view/asset/"  ,
    "log_dir"  : "/log"          ,
    "db_advert": {
        "host"              : 'localhost'  ,
        "port"              : 3306         ,
        "user"              : 'root'       ,
        "password"          : 'qkrcjfgud12',
        "database"          : 'dbAdvert'   ,
        "connectionLimit"   : 20           ,
        "waitForConnections": true         ,
        "queueLimit"        : 0            ,
    }                            ,
}
