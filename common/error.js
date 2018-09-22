/*
    author     : bak chulhyong
    created    : 2018 - 09 - 16
    modified   : 2018 - 09 - 20
    description: error file
*/
module.exports.error = {
    "SUCCESS" : "1000",
    //ERROR
    "ITN_SVR_ERR" : "1001", //INTERNAL SERVER ERROR
    "BYTE_LEN_ERR": "1002", //BYTE LENGTH ERROR
    "INVALID_URL" : "1003", //INVALID URL
    // TargetList
    "TGL_EMPTY" : "1100", //tbATargetList EMPTY
    // Advert
    "INVALID_CTT_KEY"   : "1200", //INVALID CONTENT KEY
    "INVALID_ART_KIND"  : "1201", //INVALID ART KIND
    "CTT_NOT_PLAYING"   : "1202", //CONTENT STATUS NOT PLAYING
    "ADV_AVAIL_EMPTY"   : "1203", //EMPTY AVAIL AVAVAILD
    "INVALID_INPUT_DATA": "1204,"

}
