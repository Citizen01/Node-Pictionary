
function connect(roomid){
	window.location.href = "http://pic.supgame.com/play/"+roomid;
}

var submitted = false;
document.getElementById("roomform").onsubmit = function (e) {
	if (submitted) { return false;}
	submitted = true;
	return true;
}

//Next version: add ajax to refresh the rooms list.