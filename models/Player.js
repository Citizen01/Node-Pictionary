var mongoose = require('./getMongoose.js').mongoose,
	languages = "english french spanish german".split(' '),
	PlayerSchema = mongoose.Schema({
		nickname: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String
		},
		language: {
			type: String,
			enum: languages,
		}
	}),

	PlayerModel = mongoose.model('Player', PlayerSchema);

exports.Player = PlayerModel;