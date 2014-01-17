var Player = require('../models/Player.js').Player;

module.exports = {
	/*
	 * GET index page.
	 */
	index: function(req, res){
		
		var p1 = new Player({
			"id" : 1,
			"nickname": "admin",
			"password": "test"
		});

		p1.save(function(err, user){
			if (err){ console.log(err); }
			else {
				console.log("Player " + p1.nickname + " added !");
			}
		})

	  	res.render('index', { title: 'Express' });
	},

	/*
	 * GET register page.
	 */
	register: function(req, res){
	  	res.render('register', { title: 'Express' });
	},

	/*
	 * POST register page.
	 */
	doRegister: function(req, res){
	  
	  	//Redirect ou render ac les erreurs
	},

	/*
	 * GET login page.
	 */
	login: function(req, res){
	  	res.render('login', { title: 'Express' });
	},

	/*
	 * POST login page.
	 */
	doLogin: function(req, res){
	  
	  	//Redirect ou render ac les erreurs
	},

	/*
	 * GET logout page.
	 */
	logout: function(req, res){

	  	//Redirect
	},

	/*
	 * GET ladder page.
	 */
	ladder: function(req, res){
	  	res.render('index', { title: 'Express' });
	}
}