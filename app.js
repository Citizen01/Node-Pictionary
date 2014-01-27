
/**
 * Module dependencies.
 */

var express = require('express'),
	flash = require('connect-flash'),
	http = require('http'),
	path = require('path'),
	swig = require('swig'),
	connect = require('connect'),
	defaultRoutes = require('./routes/default'),
	userRoutes = require('./routes/user'),
	gameRoutes = require('./routes/game');

var app = express()


var sessionStore = new connect.session.MemoryStore();
var SITE_SECRET = 'odltst%yz@t5h)d3*vzm)27smktq';

// all environments
app.set('domain', "0.0.0.0");
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser(SITE_SECRET));
app.use(express.session({
    store: sessionStore,
    key: 'express.sid'}));
app.use(flash());

app.use(function(req, res, next) {
    res.locals.messages = function() { return req.flash() };
    res.locals.user = req.session.user;
    res.locals.req = req;

    require('./socket.io/socket.io.js').updateStore(req.session);
    next();
});

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

app.get('/profile', userRoutes.uprofile);
app.post('/profile', userRoutes.doUprofile);

app.get('/rooms', gameRoutes.rooms);
app.post('/rooms', gameRoutes.doRooms);

app.get('/play/:roomid', gameRoutes.game);

/*--------*/

/*---- Server instance ----*/
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
/*------------------------*/

/*---- Socket.io instance ----*/
var io = require('socket.io').listen(server);

//Working with sessions
// io.set('authorization', function(data, accept){
//   if (!data.headers.cookie) {
//     return accept('Session cookie required.', false);
//   }
//   /* NOTE: First parse the cookies into a half-formed object. */
//   data.cookie = require('cookie').parse(data.headers.cookie);
//   /* NOTE: Next, verify the signature of the session cookie. */
//   data.cookie = require('connect').parseSignedCookies(data.cookie, SITE_SECRET);
 
//   /* NOTE: save ourselves a copy of the sessionID. */
//   console.log(data.cookie);
//   data.sessionID = data.cookie['express.sid'];
//   /* NOTE: get the associated session for this ID. If it doesn't exist,
//    *       then bail. */
//   sessionStore.get(data.sessionID, function(err, session){
//     if (err) {
//       return accept('Error in session store.', false);
//     } else if (!session) {
//       return accept('Session not found.', false);
//     }
//     // success! we're authenticated with a known session.
//     data.session = session;
//     return accept(null, true);
//   });
// });

//Send the io variable into socket.io.js file
require('./socket.io/socket.io.js').activateIO(io, sessionStore);
setInterval(function () {
  require('./socket.io/socket.io.js').updateIO(io);
}, 1000);
/*----------------------------*/