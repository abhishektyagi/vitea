
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  ,	register = require('./routes/register')
  , trans = require('./routes/trans')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
app.use('/static',express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/register', register.register);
app.get('/users', user.list);

app.post('/trans', function(req, res) {
  var resp = trans.trans;
  res.send('<response> <subject> 　<textFrom>日本チーム</textFrom> 　<textTo>Japan team</textTo> </subject> <body> <textFrom>勝利</textFrom> <textTo>victory</textTo> </body> </response>');
});

app.set('title','Vitae');

/*
app.use(function(err,req,res, next){
	console.error(err.stack);
	res.send (500,"Server Error");
});*/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
