module.exports = {
	/*
	 * GET rooms page.
	 */
	rooms: function(req, res){
		if (!req.session.user) {return res.redirect('/login');}
	  	res.render('index', { title: 'Rooms' });
	},

	/*
	 * POST rooms page.
	 */
	doRooms: function(req, res){
		if (!req.session.user) {return res.redirect('/login');}
	},

	/*
	 * GET play page.
	 */
	game: function(req, res){
		if (!req.session.user) {return res.redirect('/login');}
	  	res.render('game', { title: 'Game' });
	},

	/*
	 * POST play page.
	 */
	doGame: function(req, res){
		if (!req.session.user) {return res.redirect('/login');}
	}
}
