const RestProxy = require('sp-rest-proxy');
const express = require('express');
 
const settings = {
    configPath: './config/private.json', // Location for SharePoint instance mapping and credentials
    port: 8080,                          // Local server port
    staticRoot: './static'               // Root folder for static content
};
 
const restProxy = new RestProxy(settings);
restProxy.serve();

var app = express();

//for logging purposes
app.use(function (req, res, next) {
    console.log(req.method + ": " + req.path);
    next();
});

//intercept api requests that we can't handle and forward them to the SharePoint server (using the proxy from above)
var forwardToProxy = function (req, res) {

    var proxy = 'http://localhost:8080';
    var request = require('request');
    
    var options = {
        url: proxy + req.originalUrl,
        method: req.method,
        headers: req.headers
    };
    options.headers.origin = proxy;

    var SharePointReply = request(options);

    req.pipe(SharePointReply);
    SharePointReply.pipe(res);
}

app.use('*/_vti_bin', forwardToProxy);
app.use('*/_api', forwardToProxy);

//RUN SUDO on OSX because port 80 being used!!
app.listen(80, function(){
  console.log("Proxy server listening for requests on port 80....");
});