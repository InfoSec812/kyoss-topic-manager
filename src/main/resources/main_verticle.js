/**
 * This is the MAIN verticle which is loaded when this module is deployed.
 * All other verticles must be loaded programmatically from this verticle.
 */

var vertx = require('vertx')
var console = require('vertx/console')
var container = require('vertx/container')

var config = container.config;
var logger = container.logger;

var server = vertx.createHttpServer();

var rm = new vertx.RouteMatcher();

// Create a handler to serve static content
rm.allWithRegEx('\/.*\.(js|html|htm|css|png|gif|jpg|jpeg|JS|HTML|HTM|CSS|PNG|GIF|JPG|JPEG)[?\w\d=_-]*', function(req) {
    var staticFile = req.path();
    req.response.sendFile('static'+staticFile);
});

// Index file handler
rm.all("/", function(req) {
    req.response.sendFile('static/index.html');
});

// Add the routematcher to the HTTP Server
server.requestHandler(rm);

// Create a SockJS server on top of the HTTP Server and tie it to the Vert.x event bus.
var sockJSServer = vertx.createSockJSServer(server);
sockJSServer.bridge({prefix : '/eventbus'},
        [/* an array of eventbus addresses allowed to be accessed from the client */],
        [/* an array of eventbus addresses allowed to be accessed from the client */] );

// Start the server listening for requests!
server.listen(8080);