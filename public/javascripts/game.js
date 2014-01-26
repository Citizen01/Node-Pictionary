

/*** timer-zone ***/
var time=150, mins, secs,
	spanTime = document.getElementById('time');

/* countdown */
setInterval(function(){
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
	/* TODO: send the msg to server */
	displayMessage(null, msg);
}

function displayMessage(user, msg) {
	var li = document.createElement('li');
	li.innerHTML = msg;
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
	lmousePressed = false;

// function startDrawing() {
	canvas.onmousedown = function(e) {
		e.preventDefault();
		if (e.button == 0) {
			lmousePressed = true;
			ctx.beginPath();
			ctx.moveTo(e.x-canvas.offsetLeft, e.y-canvas.offsetTop);
		}
	}

	canvas.onmouseup = function(e) {
		e.preventDefault();
		if (e.button == 0) {
			lmousePressed = false;
		}
	}

	canvas.onmouseout = function(e) {
		e.preventDefault();
		lmousePressed = false;
	}

	canvas.onmousemove = function(e) {
		e.preventDefault();
		if (lmousePressed) {
			var x = e.x-canvas.offsetLeft, y = e.y-canvas.offsetTop
			ctx.lineWidth = getSelectedSize();
			ctx.strokeStyle = getSelectedColor();
			ctx.lineJoin = "round";
			ctx.lineCap = "round";
			ctx.lineTo(x, y);
			ctx.stroke();
		}
	}
// }

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