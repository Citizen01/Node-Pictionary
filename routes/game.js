var rm = require('../models/Room.js').RoomManager,
	socket = require('../socket.io/socket.io.js');


module.exports = {
	/*
	 * GET rooms page.
	 */
	rooms: function(req, res){
		if (!req.session.user) {return res.redirect('/login');}
	  	res.render('rooms', { title: 'Rooms', rooms: rm.rooms });
	},

	/*
	 * POST rooms page.
	 */
	doRooms: function(req, res){
		if (!req.session.user) {return res.redirect('/login');}
		var name = req.body.roomname,
			lang = req.body.language;
		var room = rm.createRoom(name, lang);
		res.redirect('/play/'+room.id);
	},

	/*
	 * GET play page.
	 */
	game: function(req, res){
		if (!req.session.user) {return res.redirect('/login');}
		var room = rm.getRoomById(req.params.roomid)
		if (room != undefined) {
	  		return res.render('game', { title: 'Game', room: room});
		}
		req.flash('error', 'The room no longer exists !');
		res.redirect('/rooms');
	}
}
