module.exports = {
	/*
	 * GET profile page.
	 */
	uprofile: function(req, res){
	  res.render('index', { title: 'Profile' });
	},

	/*
	 * POST profile page.
	 */
	doUprofile: function(req, res){
		
	}
}