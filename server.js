/*
    author     : bak chulhyong
    created    : 2018 - 09 - 12
    modified   : 2018 - 09 - 12
    description: server
*/
const fs   = require('fs');
const http = require('http');
const url  = require('url');

const EQUIP = require('./common/equip.js');
const LOG   = require('./common/log.js');

// HTTP
const PORT     = EQUIP.getConfig('port');
// DIR
const HTML_DIR = EQUIP.getConfig('html_dir');

http.createServer(function (req, res) {
    console.log("SERVER RUNNING AT PORT:", PORT);
  // var urlObj = url.parse(req.url, true, false);
  // fs.readFile(HTML_DIR + urlObj.pathname, function (err,data) {
  //   if (err) {
  //     res.writeHead(404);
  //     res.end(JSON.stringify(err));
  //     return;
  //   }
  //   res.writeHead(200);
  //   res.end(data);
  // });
}).listen(PORT);
