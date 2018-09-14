/*
    author     : bak chulhyong
    created    : 2018 - 09 - 13
    modified   : 2018 - 09 - 14
    description: modules
*/
// PAGE LIST
module.exports.PG_LIST = {
    "default": require('./main/main_module.js')      ,
    "asset"  : require('./asset/asset_module.js')    ,
    "advert" : require('./advert/advert_module.js')  ,
    "content": require('./content/content_module.js'),
}
