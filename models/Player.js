var mongoose = require('./getMongoose.js').mongoose,
	PlayerSchema = mongoose.Schema({
		id : Number,
		nickname : String,
		password : String
	}),

	PlayerModel = mongoose.model('Player', PlayerSchema);

exports.Player = PlayerModel;