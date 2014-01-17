var mongoose = require('mongoose');

mongoose.connect('localhost', 'pictionary');

exports.mongoose = mongoose;