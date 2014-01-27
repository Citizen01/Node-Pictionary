// !! Not persisted in database !! \\

var id = 0;

function Room(name, lang) {
	this.id = id++;
	this.lang = lang;
	this.name = name;
	this.players = new Array();
	this.maxplayers = 4;

	this.getNbPlayers = function()
	{
   		return this.players.length;
	}
	console.log('Room ' + this.name + '(' + this.id + ') has been created !');
}

//Singleton
function RoomManager() {
	if ( arguments.callee._singletonInstance )
		return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;

	this.rooms = new Array();

	this.createRoom = function(name, lang) {
		var room = new Room(name, lang);
		this.rooms[room.id] = room;
		return room;
	}

	/*this.getRooms = function() {
		return this.rooms;
	}*/

	this.deleteRoom = function(room) {
		delete this.rooms[room.id];
	}

	this.getRoomById = function(rid) {
		return this.rooms[rid];
	}

}

var rm = new RoomManager(); //Instanciation
exports.RoomManager = rm;