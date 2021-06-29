function game1() {
	gridWidth = Math.floor(canvasWidth / blockSize);
	gridHeight = Math.floor(canvasHeight / blockSize);

	gridOffsetX = canvasWidth % blockSize / 2;
	gridOffsetY = canvasHeight % blockSize / 2;

	context.fillStyle = "white";
	context.fillRect(0, 0, canvasWidth, canvasHeight);
	document.addEventListener("keydown", rotate);
	document.addEventListener("keyup", unRotate);

	for (var i = 0; i < appleCount; i++) {
		makeApple();
	}

	addPlayer(37, 39, 5, 5, 5);
	addPlayer(65, 68, 10, 5, 5);
    var gameLoop = setInterval(frame, 1000 / 15);
}

function game2() {

}

function addPlayer(leftKey, rightKey, x, y, length) {
	players.push({
		direction: 0,
		position: {
    		x: x,
    		y: y
    	},
    	trail: [],
    	tail: length,
    	keys: {
    		left: leftKey,
    		right: rightKey
    	},
    	keysDown: {
    		left: false,
    		right: false
    	}
	})
}

function makeApple() {
	apples.push({
		x: Math.floor(Math.random() * gridWidth),
		y: Math.floor(Math.random() * gridHeight)
	});
}

function killPlayer(id) {
	players.splice(id, 1);
}

function rotate(event) {
	var keycode = event.keycode ? event.keycode : event.which;
	for (var i = 0; i < players.length; i++) {
		var player = players[i];
		if (player.keys.left == keycode && !player.keysDown.left) {
			player.keysDown.left = true;
			player.direction = (player.direction + 3) % 4;
		}
		if (player.keys.right == keycode && !player.keysDown.right) {
			player.keysDown.right = true;
			player.direction = (player.direction + 1) % 4;
		}
	}
}

function unRotate(event) {
	var keycode = event.keycode ? event.keycode : event.which;
	for (var i = 0; i < players.length; i++) {
		var player = players[i];
		if (player.keys.left == keycode && player.keysDown.left) {
			player.keysDown.left = false;
		}
		if (player.keys.right == keycode && player.keysDown.right) {
			player.keysDown.right = false;
		}
	}
}

function frame() {
	context.fillStyle = "white";
	context.fillRect(0, 0, canvasWidth, canvasHeight);
	for (var i = 0; i < players.length; i++) {
		var player = players[i];
		switch (player.direction) {
		    case 0:
		        player.position.x += 1;
		        if (player.position.x > gridWidth - 1) {
		            player.position.x = 0;
		        }
		        break;
		    case 1:
		        player.position.y += 1;
		        if (player.position.y > gridHeight - 1) {
		            player.position.y = 0;
		        }
		        break;
		    case 2:
		        player.position.x -= 1;
		        if (player.position.x < 0) {
		            player.position.x = gridWidth - 1;
		        }
		        break;
		    case 3:
		        player.position.y -= 1;
		        if (player.position.y < 0) {
		            player.position.y = gridHeight - 1;
		        }
		        break;
		}

		player.trail.push({
			x: player.position.x,
			y: player.position.y
		});

		while (player.trail.length > player.tail) {
			player.trail.shift();
		}
	}

	for (var i = 0; i < players.length; i++) {
		var player = players[i];

		for (var j = 0; j < players.count; j++) {
			var comparePlayer = players[j];

			if (player.position.x == comparePlayer.position.x && player.position.y == comparePlayer.position.y) {
				killPlayer(i);
			}

			for (var k = 0; k < comparePlayer.trail.length; k++) {
				if (player.position.x == comparePlayer.trail[k].x && player.position.y == comparePlayer.trail[k].y) {
					killPlayer(i);
				}
			}
		}

		for (var j = 0; j < player.trail.length - 1; j++) {
			if (player.position.x == player.trail[j].x && player.position.y == player.trail[j].y) {
				killPlayer(i);
			}
		}
	}

	for (var i = 0; i < players.length; i++) {
		var player = players[i];

		for (var j = 0; j < player.trail.length; j++) {
			printCell(player.trail[j].x, player.trail[j].y, "lime");
		}

		printCell(player.position.x, player.position.y, "green");

		for (var j = 0; j < apples.length; j++) {
			apple = apples[j];
			if (player.position.x == apple.x && player.position.y == apple.y) {
				player.tail += 1;
				apples.splice(j, 1);
				makeApple();
			}
		}
	}

	for (var i = 0; i < apples.length; i++) {
		var apple = apples[i];
		printCell(apple.x, apple.y, "red");
	}
}

function printCell(x, y, color) {
	context.fillStyle = color;
	context.fillRect(gridOffsetX / 2 + x * blockSize + 1, gridOffsetY / 2 + y * blockSize + 1, blockSize - 2, blockSize - 2);
}