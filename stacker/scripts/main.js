var canvas, context;
var grid = [];
var width = 7;
var height = 15;

var smallReward = 10;
var bigReward = 15;

var mainThread;

var position = 2;
var direction = 1;
var size = 3;
var line = 1;

var cellSize = 40;
var key = false;

function endGame() {
	clearInterval(mainThread);
	context.fillStyle = "grey";
	context.fillRect(0, 0, 400, 600);
	context.fillStyle = "blue";
	context.textAlign = "center";
	context.font = "30px Arial";
	if (line > 10 && line <= 15) {
		context.fillText("You got the small reward!", 200, 175);
	} else if (line > 15) {
		context.fillText("You got the big reward!", 200, 175);
	} else {
		context.fillText("You got to line " + (line - 1) + "!", 200, 175);
	}
	document.removeEventListener("keydown", keyDown);
	document.removeEventListener("keyup", keyUp);
	startGame();
}

function reset() {
	grid = [];
	position = 2;
	direction = 1;
	size = 3;
	line = 1;
	key = false;
	for (var i = 0; i < 16; i++) {
		grid.push([0, 0, 0, 0, 0, 0, 0]);
	}
	grid[0] = [1, 1, 1, 1, 1, 1, 1];
	document.addEventListener("keydown", keyDown);
	document.addEventListener("keyup", keyUp);
	draw();
	mainThread = setInterval(step, 400);
}

window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("2d");

	context.fillStyle = "grey";
	context.fillRect(0, 0, 400, 600);
	startGame();
}

function startGame() {
	context.fillStyle = "black";
	context.font = "30px Arial";
	context.textAlign = "center";
	context.fillText("Press Enter to start", 200, 315);
	document.addEventListener("keydown", start);
}

function start(event) {
	var keycode = event.keycode ? event.keycode : event.which;

	if (keycode == 13) {
		reset();
		document.removeEventListener("keydown", start);
	}
}

function draw() {
	context.fillStyle = "grey";
	context.fillRect(0, 0, 400, 600);
	context.fillStyle = "red";
	context.fillRect(0, 0, 400, 40);
	context.fillStyle = "blue";
	context.fillRect(0, 200, 400, 40);
	for (var i = 0; i <= 15; i++) {
		for (var j = 0; j < 7; j++) {
			if (grid[i][j] == 1) {
				context.fillStyle = "white";
				context.fillRect(60 + j * cellSize + 2, (15 - i) * cellSize + 2, cellSize - 4, cellSize - 4);
			} else {
				context.fillStyle = "black";
				context.fillRect(60 + j * cellSize + 2, (15 - i) * cellSize + 2, cellSize - 4, cellSize - 4);
			}
 		}
	}
	context.fillStyle = "white";
	for (var i = 0; i < size; i++) {
		context.fillRect(60 + (position + i) * cellSize + 2, (15 - line) * cellSize + 2, cellSize - 4, cellSize - 4)
	}
}

function step() {
	position += direction;
	if (position + direction >= 9 - size) {
		direction *= -1;
		position -= 2;
	} else if (position < 0) {
		direction *= -1;
		position += 2;
	}
	draw();
}

function keyDown(event) {
	var keycode = event.keycode ? event.keycode : event.which;
	if (keycode == 32 && !key) {
		key = true;
		var length = 0;
		 for (var i = 0; i < size; i++) {
		 	if (grid[line - 1][position + i] == 1) {
		 		grid[line][position + i] = 1;
		 		length += 1;
	 		}
		 }
		 if (length < size) {
		 	size = length;
		 }
		 line += 1;

		 if (line > 5 && size > 2) {
		 	size = 2;
		 }
		 if (line > 10 && size > 1) {
		 	size = 1;
		 }

		 if (size <= 0 || line > 15) {
		 	endGame();
		 } else {
		 	draw();
		 	clearInterval(mainThread);
		 	mainThread = setInterval(step, 400 - 15 * line);
		 }
	}
}

function keyUp(event) {
	var keycode = event.keycode ? event.keycode : event.which;
	if (keycode == 32) {
		key = false;
	}
}