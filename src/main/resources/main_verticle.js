/**
 * This is the MAIN verticle which is loaded when this module is deployed.
 * All other verticles must be loaded programmatically from this verticle.
 */

// Some boilerplate
var vertx = require('vertx');
var console = require('vertx/console');
var container = require('vertx/container');

var config = container.config;
var logger = container.logger;
var eventBus = vertx.eventBus;
var timer = vertx.timer;

// Create an HTTP server
var server = vertx.createHttpServer();

// Create a RouteMatcher which allows us to map URLs to handlers
var rm = new vertx.RouteMatcher();

// Start a periodic event which sends a message containing the current time 
// on the server.
var periodicTimer = timer.setPeriodic(1000, function(periodicTimer) {
    var currentTime = new java.util.Date();
    logger.info("Sending update to client.");
    eventBus.publish('client.time.update', currentTime.toString());
});

// Create a handler to serve static content
// NOTE: This could also be replaced with a templating system!!!
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
        [/* an array of message filters allowed to be received from the client */],
        [/* an array of message filters allowed to be sent to the client */{address: 'client.time.update'}] );

// Start the server listening for requests!
server.listen(8080);