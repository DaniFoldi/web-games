var canvas, context;
var game = [];
var gridSize = 100;
var grid = 5;
var won = false;

window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("2d");
	canvas.addEventListener("click", click);
	reset();
}

function reset() {
	grid = document.getElementById("grid").value;
	gridSize = 500 / grid;
	context.fillStyle = "grey";
	context.fillRect(0, 0, 500, 500);
	for (var i = 0; i < grid; i++) {
		game.push([]);
		for (var j = 0; j < grid; j++) {
			game[i][j] = false;
		}
	}
	won = false;
	/*canvas.width = grid * gridSize;
	canvas.height = grid * gridSize;*/
	document.getElementById("moveCount").innerText = grid ** 2;
	graphics();
}

function graphics() {
	won = true;
	context.fillStyle = "grey";
	context.fillRect(0, 0, 500, 500);
	for (var i = 0; i < grid; i++) {
		for (var j = 0; j < grid; j++) {
			if (game[i][j]) {
				draw(i, j, "white");
			} else {
				draw(i, j, "black");
				won = false;
			}
		}
	}

	if (game[0][1]) {
		draw(0, 1, "white");
	} else {
		draw(0, 1, "black");
	}

	if (won) {
		context.fillStyle = "grey";
		context.fillRect(0, 0, 500, 500);
		context.font = "30px Arial"
		context.fillStyle = "black";
		context.textAlign = "center";
		context.fillText("You won!", 250, 265);
	}
}

function click(event) {
	if (!won) {
		var x = Math.floor(event.offsetX / gridSize);
		var y = Math.floor(event.offsetY / gridSize);
		game[x][y] = !game[x][y];
		if (x > 0) {
			game[x - 1][y] = !game[x - 1][y];
		}
		if (y > 0) {
			game[x][y - 1] = !game[x][y - 1];
		}
		if (x < grid - 1) {
			game[x + 1][y] = !game[x + 1][y];
		}
		if (y < grid - 1) {
			game[x][y + 1] = !game[x][y + 1];
		}

		graphics();
	}
}

function draw(x, y, color) {
	context.fillStyle = color;
	context.fillRect(x * gridSize + 1, y * gridSize + 1, gridSize - 2, gridSize - 2);
}