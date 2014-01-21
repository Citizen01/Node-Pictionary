module.exports = {
	/*
	 * GET rooms page.
	 */
	rooms: function(req, res){
	  	res.render('index', { title: 'Rooms' });
	},

	/*
	 * POST rooms page.
	 */
	doRooms: function(req, res){

	},

	/*
	 * GET play page.
	 */
	game: function(req, res){
	  	res.render('game', { title: 'Game' });
	},

	/*
	 * POST play page.
	 */
	doGame: function(req, res){

	}
}
