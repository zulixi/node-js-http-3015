'use strict';
const http = require('http');
const server = http.createServer((req, res) => {
  const now = new Date();
  console.info('[' + now + '] Requested by' + req.connection.remoteAddress);
  res.writeHead(200,{
    'Content-Type' : 'text/html; charset=utf-8'
  });

  switch(req.method){
    case 'GET':
      const fs = require('fs');
      const rs = fs.createReadStream('./form.html');
      rs.pipe(res);
      break;
    case 'POST':
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
        console.log('date');
      }).on('end', () => {
        console.log('end');
        body = Buffer.concat(body).toString();
        const decoded = decodeURIComponent(body);
        res.write('<!DOCTYPE html><html lang="ja"><head><meta charset=utf-8></head><body><h1>' + decoded + 'が投稿されました</h1></body></html>');
        res.end();
      });
      break;
      default:
        break;
  }
}).on('error', (err) => {
  console.error('[' + new Date() + '] Server Error' + err);
}).on('clientError', (err) => {
  console.error('[' + new Date() + '] Client Error' + err);
});

const port = 8000;
server.listen(port, () => {
  console.info('[' + new Date() + '] Listening on ' + port);
});