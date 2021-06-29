var canvas, context;
var highscore;
var sequence = "";

var isplaying = false;
var mainThread;

window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("2d");
	canvas.addEventListener("click", click);
	draw();
}

function add() {
	var next = Math.floor(Math.random() * 4);
	sequence += next;
}

function draw() {
	makeRect(200, 100 - 10, "#D00");
	makeRect(250 + 10, 150, "#00D");
	makeRect(200, 200 + 10, "#0D0");
	makeRect(150 - 10, 150, "#DD0");
}

function step(color, value, position) {
	switch (color) {
		case "1":
			makeRect(200, 100 - 10, "#F00");
			makeRect(200, 100 - 10, "#D00");
			break;
		case "2":
			makeRect(200, 100 - 10, "#00F");
			makeRect(200, 100 - 10, "#00D");
			break;
		case "3":
			makeRect(200, 100 - 10, "#0F0");
			makeRect(200, 100 - 10, "#0D0");
			break;
		case "4":
			makeRect(200, 100 - 10, "#FF0");
			makeRect(200, 100 - 10, "#DD0");
			break;
	}

	if (value == 1) {
		mainThread = setTimeout(step(1, 0, position), 400);
	} else if (position < sequence.length) {
		mainThread = setTimeout(step(sequence[position + 1], 1, position + 1), 400);
	} else {
		mainThread = setTimeout(step(sequence[0], 1, 0), 1200);
	}
}

function makeRect(x, y, color) {
	context.fillStyle = color;
	context.beginPath();
	context.moveTo(x, y - 50);
	context.lineTo(x + 50, y);
	context.lineTo(x, y + 50);
	context.lineTo(x - 50, y);
	context.fill();
}

function click(event) {
	var x = event.offsetX;
	var y = event.offsetY;
	if (x >= 150 && x <= 250 && y >= 40 && y <= 140 && x + y >= 240 && x + y <= 340 && x - y >= 60 && x - y <= 160) {
		console.log("r");
	}
	if (x >= 90 && x <= 190 && y >= 100 && y <= 200 && x + y >= 240 && x + y <= 340 && x - y >= -60 && x - y <= 40) {
		console.log("y");
	}
	if (x >= 210 && x <= 310 && y >= 100 && y <= 200 && x + y >= 360 && x + y <= 460 && x - y >= 60 && x - y <= 160) {
		console.log("b");
	}
	if (x >= 150 && x <= 250 && y >= 160 && y <= 260 && x + y >= 360 && x + y <= 460 && x - y >= -60 && x - y <= 40) {
		console.log("g");
	}
}