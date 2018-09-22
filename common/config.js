/*
    author     : bak chulhyong
    created    : 2018 - 09 - 12
    modified   : 2018 - 09 - 20
    description: config file
*/
module.exports.config = {
    "port"     : process.env.PORT,
    "html_dir" : "/view/html/"   ,
    "asset_dir": "/view/asset/"  ,
    "log_dir"  : "/log"          ,
    "db_advert": {
        "host"              : 'us-cdbr-iron-east-01.cleardb.net',
        "port"              : 3306                              ,
        "user"              : 'bb199af2d42a06'                  ,
        "password"          : '98b5d36aba5b5ae'                 ,
        "database"          : 'heroku_8dc2d6c2cd1cfdb'          ,
        "connectionLimit"   : 0                                 ,
        "waitForConnections": true                              ,
        "queueLimit"        : 0                                 ,
    }                            ,
}
