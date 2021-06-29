var canvas, context;
var cellSize = 150;
var gridSize = 3;
var grid = [];
var who = "X";
var lastStarted = "O";
var xscore = 0;
var oscore = 0;
var won = false;
var steps = 0;

function reset() {
	context.fillStyle = "black";
	won = false;
	steps = 0;
	context.fillRect(0, 0, 450, 450);
	grid = [["","",""],["","",""],["","",""]];
	if (lastStarted == "X") {
		lastStarted = "O";
	} else {
		lastStarted = "X";
	}
	who = lastStarted;
	drawBoard();
}

function drawBoard() {
	context.fillStyle = "white";
	for (var i = 0; i < gridSize; i++) {
		for (var j = 0; j < gridSize; j++) {
			context.fillRect(i * cellSize + 1, j * cellSize + 1, cellSize - 2, cellSize - 2);
			if (grid[i][j] == "X") {
				context.beginPath();
				context.moveTo(i * cellSize + 30, j * cellSize + 30);
				context.lineTo((i + 1) * cellSize - 30, (j + 1) * cellSize - 30);
				context.moveTo((i + 1) * cellSize - 30, j * cellSize + 30);
				context.lineTo(i * cellSize + 30, (j + 1) * cellSize - 30);
				context.stroke();
			} else if (grid[i][j] == "O") {
				context.beginPath();
				context.arc(i * cellSize + cellSize / 2, j * cellSize + cellSize / 2, 55, 0, 2 * Math.PI);
				context.stroke();
			}
		}
	}
}

window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("2d");
	canvas.addEventListener("click", move);
	reset();
}

function move(event) {
	var x = Math.floor(event.offsetX / cellSize);
	var y = Math.floor(event.offsetY / cellSize);
	if (grid[x][y] == "" && !won) {
		grid[x][y] = who;
		steps += 1;
		if (grid[0][0] == who && grid[0][1] == who && grid[0][2] == who || 
			grid[1][0] == who && grid[1][1] == who && grid[1][2] == who || 
			grid[2][0] == who && grid[2][1] == who && grid[2][2] == who || 
			grid[0][0] == who && grid[1][0] == who && grid[2][0] == who || 
			grid[0][1] == who && grid[1][1] == who && grid[2][1] == who || 
			grid[0][2] == who && grid[1][2] == who && grid[2][2] == who || 
			grid[0][0] == who && grid[1][1] == who && grid[2][2] == who || 
			grid[0][2] == who && grid[1][1] == who && grid[2][0] == who) {
			if (who == "X") {
				xscore += 1;
			} else {
				oscore += 1;
			}
			won = true;
			setTimeout(reset, 1000);
			document.getElementById("score").innerText = "X: " + xscore + " O: " + oscore;
		}
		if (who == "X") {
			who = "O";
		} else {
			who = "X";
		}
		drawBoard();
	}
	if (steps >= 9) {
		setTimeout(reset, 1000);
	}
}