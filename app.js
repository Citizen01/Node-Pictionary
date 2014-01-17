
/**
 * Module dependencies.
 */

var express = require('express'),
	database = require('./mysql/mysql'),
	user = require('./routes/user'),
	http = require('http'),
	path = require('path'),
	swig = require('swig'),
	defaultRoutes = require('./routes/default'),
	userRoutes = require('./routes/user');

 app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/* Routes */
app.get('/', defaultRoutes.index);

app.get('/ladder', defaultRoutes.ladder);

app.get('/register', defaultRoutes.register);
app.post('/register', defaultRoutes.doRegister);

app.get('/login', defaultRoutes.login);
app.post('/login', defaultRoutes.doLogin);

app.get('/logout', defaultRoutes.logout);

app.get('/profile', user.uprofile);
app.post('/profile', user.doUprofile);
/*--------*/

/*---- Server instance ----*/
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
/*------------------------*/