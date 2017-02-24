'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 8000;

const server = http.createServer(function(req, res) {
  // TODO: BUILD OUT REST OF SERVER

  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    console.log('get request to cowsay');
    res.write(cowsay.say({text: 'hello from cowville'}));
    res.end();
  }

  if (req.method === 'POST') {
    parseBody(req, function(err) {
      console.log(`POST request body: ${req.body}`);
    });
  }
});

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}.`);
});
