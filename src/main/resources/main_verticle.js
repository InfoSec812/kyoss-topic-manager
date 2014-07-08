var vertx = require('vertx')
var console = require('vertx/console')
var container = require('vertx/container')

var config = container.config;
var logger = container.logger;

var server = vertx.createHttpServer();

var rm = new vertx.RouteMatcher();

rm.allWithRegEx('\/.*\.(js|html|htm|css|png|gif|jpg|jpeg|JS|HTML|HTM|CSS|PNG|GIF|JPG|JPEG)[?\w\d=_-]*', function(req) {
    var staticFile = req.path();
    req.response.sendFile('static'+staticFile);
});
rm.all("/", function(req) {
    req.response.sendFile('static/index.html');
});

server.requestHandler(rm);

var sockJSServer = vertx.createSockJSServer(server);
sockJSServer.bridge({prefix : '/eventbus'}, [], [] );

server.listen(8080);