var Player = require('../models/Player.js').Player;
var crypto = require('crypto');

module.exports = {
	/*
	 * GET index page.
	 */
	index: function(req, res){
	  	res.render('index', { title: 'Index' });
	},

	/*
	 * GET register page.
	 */
	register: function(req, res){
	  	res.render('register', { title: 'Register' });
	},

	/*
	 * POST register page.
	 */
	doRegister: function(req, res){

		var nick = req.body.username,
			pass = req.body.password,
			pass2 = req.body.password2,
			lang = req.body.language,
			errors = 0;

		//Nickname checking
		if (nick == undefined || nick == null || nick == '') {
			req.flash('error', 'You must enter a nickname !');
			errors++;
		}

		//Password checking
		if (pass == undefined || pass == null || pass == '') {
			req.flash('error', 'You must supply a password !');
			errors++;
		} else if (pass2 == undefined || pass2 == null || pass2 == '') {
			req.flash('error', 'You must enter the password confirmation !');
			errors++;
		} else if (pass != pass2) {
			req.flash('error', 'The two passwords doesn\'t match !');
			errors++;
		}
		
		//Language checking
		if (lang != 'english' && lang != 'french' && lang != 'spanish' && lang != 'german') {
			req.flash('error', 'You must select a language ! ');
			errors++;
		}

		if (errors == 0) {
			pass = crypto.createHash('sha256').update(pass).digest('hex');
			console.log('The encrypted pass is : ' + pass);
			//Register the guy
			var player = new Player({
	            'nickname': nick,
	            'password': pass,
	            'language': lang
	        });

	        player.save(function(err, user){
	            if (err){
	            	console.log(err);
	            	req.flash('error', 'This nickname is already taken !');
	            	return res.redirect('/register');
	            }
                console.log('Player ' + player.nickname + ' registered !');
                res.redirect('/');
	        })
		} else {
			res.redirect('/register');
		}
	},

	/*
	 * GET login page.
	 */
	login: function(req, res){
	  	res.render('login', { title: 'Login' });
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
	  	res.render('index', { title: 'Ladder' });
	}
}