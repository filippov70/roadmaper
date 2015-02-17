
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , conf = require('./conf')
  , logger = require('./libs/log')(module)
  , path = require('path');

var app = express();

/*proxy for getFeatureInfo*/
var forward = require('./proxy/forward.js');
app.use(forward(/\/gf\/(.*)/, ''));

// all environments
app.set('port', conf.get('serverport'));
//app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
app.get('/', function(req, res, next){
	res.render('index', {
		
	});
});

http.createServer(app).listen(app.get('port'), function(){
  logger.info('Express server listening on port ' + app.get('port'));
});
