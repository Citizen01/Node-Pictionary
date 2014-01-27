// var localuser = {isDrawer: true};

/*** timer-zone ***/
var defaultTime = 150, time = defaultTime, mins, secs,
	spanTime = document.getElementById('time'),
	statuses = { waiting: 0, playing: 1, midtime: 3}
	status = statuses.waiting;

//   /play/3 => 3
var roomid = parseInt(location.pathname.match(/\/play\/(.*)/)[1]);

/* countdown */
function resetCoundown() { time=defaultTime; }
setInterval( function() {
	// if (status != statuses.playing) { return ;}
	mins = Math.floor(time / 60).toString();
	secs = (time - mins * 60).toString();
	if (secs.length < 2) { secs = "0" + secs; }
	spanTime.innerHTML = mins + ":" + secs;
	if (time > 0) { time--; } else { time = 0; }
}, 1000)
/*** Fin zone ***/

/*** score-zone ***/
var ulPlayerlist = document.getElementById('playerlist');

function updatePlayerlist() {
	ulPlayerlist.innerHTML = "";
	/* TODO: get the real list and display */
	for (var p in players) {
		var li = document.createElement('li'),
			span = document.createElement('span');
		span.innerHTML = p.nickname;
		li.appendChild(span);
		li.innerHTML = li.value + p.points + " points"
		
		if (p.nickname == drawer.nickname) {
			li.class = 'drawer';
		}
	}
}
/*** Fin zone ***/


/*** chat-zone ***/
var ulMessages = document.getElementById('messages'),
	input = document.getElementById('inputmsg');

function sendMessage() {
	var msg = input.value;
	input.value = "";
	socket.emit('msg', { msg: msg });
	displayMessage("Me", msg);
}

function displayMessage(name, msg) {
	var li = document.createElement('li');
	var username = '<span>' + name + ':</span>';
	li.innerHTML = username + msg;
	var lastMsg = ulMessages.firstChild;
	ulMessages.insertBefore(li, lastMsg);
}
/*** Fin zone ***/


/*** drawing-zone ***/
/** Header **/
/* Vars */
var n_pencil = document.getElementById('pencil'),
	n_eraser = document.getElementById('eraser'),
	//Sizes
	n_small = document.getElementById('s-small'),
	n_medium = document.getElementById('s-medium'),
	n_large = document.getElementById('s-large'),
	//Colors line 1
	n_black = document.getElementById('black'),
	n_grey = document.getElementById('grey'),
	n_red = document.getElementById('red'),
	n_brown = document.getElementById('brown'),
	n_skin = document.getElementById('skin'),
	n_orange = document.getElementById('orange'),
	//line 2
	n_white = document.getElementById('white'),
	n_yellow = document.getElementById('yellow'),
	n_green = document.getElementById('green'),
	n_blue = document.getElementById('blue'),
	n_purple = document.getElementById('purple'),
	n_pink = document.getElementById('pink');

var tools = new Array(n_pencil, n_eraser);
var sizes = new Array(n_small, n_medium, n_large);
var colors = new Array(
	n_black, n_grey, n_red, n_brown, n_skin, n_orange, 
	n_white, n_yellow, n_green, n_blue, n_purple, n_pink
);

var selectedTool = n_pencil,
	selectedSize = n_small,
	selectedColor = n_black;

/* Functions */
function onToolSelected(tool) {
	selectedTool.removeAttribute('class');
	tool.setAttribute('class', 'selected');
	selectedTool = tool;
}

function onSizeSelected(size) {
	selectedSize.removeAttribute('class');
	size.setAttribute('class', 'selected');
	selectedSize = size;
}

function onColorSelected(color) {
	selectedColor.removeAttribute('class');
	color.setAttribute('class', 'selected');
	selectedColor = color;
}

/* Events */
//tools
for (var i in tools) {
	tools[i].onclick = function(e) {
		e.preventDefault();
		onToolSelected(e.srcElement);
	}
}
//sizes
for (var i in sizes) {
	sizes[i].onclick = function(e) {
		e.preventDefault();
		onSizeSelected(e.srcElement);
	}
}
//colors
for (var i in colors) {
	colors[i].onclick = function(e) {
		e.preventDefault();
		onColorSelected(e.srcElement);
	}
}
/** Fin Header **/


/** Canvas **/
var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	lmousePressed = false,
	fromX = 0, fromY = 0;

function resetCanvas() {
	ctx.clearRect ( 0, 0 , canvas.width, canvas.height );
}


canvas.onmousedown = function(e) {
	e.preventDefault();
	// if (!localuser.isDrawer) { return; }
	if (e.button == 0) {
		lmousePressed = true;
		ctx.beginPath();
		fromX = e.x-canvas.offsetLeft;
		fromY = e.y-canvas.offsetTop;
		// ctx.moveTo(e.x-canvas.offsetLeft, e.y-canvas.offsetTop);
	}
}

canvas.onmouseup = function(e) {
	e.preventDefault();
	// if (!localuser.isDrawer) { return; }
	if (e.button == 0) {
		lmousePressed = false;
	}
}

canvas.onmouseout = function(e) {
	e.preventDefault();
	// if (!localuser.isDrawer) { return; }
	lmousePressed = false;
}

canvas.onmousemove = function(e) {
	e.preventDefault();
	// if (!localuser.isDrawer) { return; }
	if (lmousePressed /*&& localuser.isDrawer*/) {
		var toX = e.x-canvas.offsetLeft,
			toY = e.y-canvas.offsetTop,
			size = getSelectedSize(),
			color = getSelectedColor();
		socket.emit('draw', { 
			fx: fromX, 
			fy: fromY,
			tx: toX,
			ty: toY,
			size: size,
			color: color}
		);
		paint(fromX, fromY, toX, toY, size, color);
		fromX = toX;
		fromY = toY;
	}
}

function paint(fx, fy, tx, ty, size, color){
	ctx.lineWidth = size;
	ctx.strokeStyle = color;
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
	ctx.moveTo(fx, fy);
	ctx.lineTo(tx, ty);
	ctx.stroke();
}

function getSelectedSize() {
	if (selectedSize != undefined) {
		switch (selectedSize.id) {
			case 's-large':
				return 12;
			case 's-medium':
				return 6;				
		}
	}
	return 2;
}

function getSelectedColor() {
	if (selectedTool.id == "eraser") { return "#ffffff"; }
	if (selectedColor != undefined) {
		switch (selectedColor.id) {
			case "white":
				return "#ffffff";
			case "red":
				return "#ff0000";
			case "orange":
				return "#ff6a00";
			case "yellow":
				return "#ffd800";
			case "green":
				return "#00ff00";
			case "blue":
				return "#0000ff";
			case "purple":
				return "#3c0dcf";
			case "pink":
				return "#ff66cc";
			case "brown":
				return "#993300";
			case "grey":
				return "#808080";
			case "skin":
				return "#eebb99";				
		}
	}
	return "#000000";
}
/** Fin Canvas **/
/*** Fin zone ***/


// function ready() {
	// socket.emit('join', { roomid: roomid });
// }

/* ==== SOCKET IO ==== */
var players = {};

// document.onload = function () {
	// console.log("loaded");
	var socket = io.connect('pic.supgame.com');
	// console.log(socket);

	socket.emit('join', { roomid: roomid });

	socket.on('join', function (data) {
		console.log(data);
		var userId = '';

		players[player.id] = player;
	});

	socket.on('disconnect', function (data) {
		console.log(data);
		var playerId = '';
		delete players[playerId];
	});

	socket.on('msg', function (data) {
		console.log('msg');
		console.log(data);
		var name = data.user,
			msg = data.msg;
		displayMessage(name, msg);
	});

	socket.on('draw', function (data) {
		console.log(data);
		var fromX = data.fx,
			fromY = data.fy,
			toX = data.tx,
			toY = data.ty,
			size = data.size,
			color = data.color;
		paint(fromX, fromY, toX, toY, size, color);
	});
// };
/* =================== */