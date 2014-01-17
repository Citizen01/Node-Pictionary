//Static variables

// Constructor
function User(id, nickname, password) {
  	this.id = id;
  	this.nickname = nickname;
  	this.password = password;



  	this.playing = false;
  	this.lobby = false;
}

// class methods
User.prototype.getId = function() {
	return this.id;
};

User.prototype.setNickname = function(nick) {
	this.nickname = nick;
};

User.prototype.getNickname = function() {
	return this.nickname;
};

User.prototype.setPassword = function(pass) {
	this.password = pass;
};

User.prototype.getPassword = function() {
	return this.password;
};


User.prototype.isPlaying = function() {
	return this.isPlaying;
};

User.prototype.getLobby = function() {
	return this.lobby;
};

// export the class
module.exports = Foo;