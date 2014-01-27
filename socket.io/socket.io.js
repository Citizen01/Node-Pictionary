//socket.io connection server-side
var rm = require('../models/Room.js').RoomManager,
	Player = require('../models/Player.js').Player,
	parseCookie = require('connect').utils.parseCookie,
	io;

var sessionStore;

exports.activateIO = function(iofromapp, sessionStoreFromApp) {
	io = iofromapp;
	sessionStore = sessionStoreFromApp;
	io.sockets.on('connection', onNewConnection);
}

exports.updateStore = function(sessionStoreFromApp) {
	sessionStore = sessionStoreFromApp;
}

exports.updateIO = function(iofromapp) {
	io = iofromapp;
}

function onNewConnection(socket, session) {
	// var hs = socket.handshake;
  	// console.log('A socket with sessionID '+hs.sessionID+' connected.');
  	// console.log(hs.session);
  	//Prevent session be deleted after 60secs
  	/*var intervalID = setInterval(function(){
    	hs.session.reload(function(){
      	hs.session.touch().save();
    	});
  	}, 60 * 1000);*/
	
	// socket.to('local', data)
  	
  	//Events:


	socket.on('join', function (data) {
		var room = (data.roomid).toString();
		socket.join(room);
		// socket.broadcast.to(room).emit('join', data)
	});

	socket.on('disconnect', function (data) {
		//socket.broadcast.to('room').emit('join', data)
	});

	// socket.on('ready', function (data) {
	// 	console.log('EVENT: ready');
	// 	console.log(data);
	// 	var userid = 1;
	// 	//socket.broadcast.to('room').emit('join', data)
	// });

	socket.on('msg', function (data) {
		var username = 'Other',
			msg = data.msg;
		var room, index=0;
		for (var r in io.sockets.manager.roomClients[socket.id]) {
			if (index == 1) {room = r.replace(/\//g,'');}
			index++;
		}
		socket.broadcast.to(room).emit('msg', {user: username, msg: msg});
	});
	
	socket.on('draw', function (data) {
		var room, index=0;
		for (var r in io.sockets.manager.roomClients[socket.id]) {
			if (index == 1) {room = r.replace(/\//g,'');}
			index++;
		}
		socket.broadcast.to(room).emit('draw', data)
	});
	
}
