const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js'); 
const jsonHandler = require('./jsonResponses.js'); 

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  if(request.method == 'GET') {
    switch(parsedUrl.pathname) {
      case '/':
        htmlHandler.getIndex(request, response);
        break;
      case '/style.css':
        htmlHandler.getCSS(request, response);
        break;
      case '/getUsers':
        jsonHandler.getUsers(request, response);
        break;
      case '/updateUser':
        jsonHandler.updateUser(request, response);
        break;
      default:
        jsonHandler.notFound(request, response);
        break;
    }
  } else if (request.method == 'POST') {
    jsonHandler.updateUser(request, response);
  } else if (request.method == 'HEAD') {
    switch (parsedUrl.pathname) {
      case '/getUsers':
        jsonHandler.getUsersMeta(request, response);
        break;
      default:
        jsonHandler.notFoundMeta(request, response);
        break;
    }
  } else {
    jsonHandler.notFound(request, response);
  }
};

//start server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);