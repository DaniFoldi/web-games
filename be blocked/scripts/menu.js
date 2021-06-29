function menu() {
	context.fillStyle = "white";
	context.fillRect(0, 0, canvasWidth, canvasHeight);
	context.font = "40px Verdana";
	context.textAlign = "center";
	context.fillStyle = "#222";
	context.fillText("Don't be blocked!", canvasWidth / 2, canvasHeight / 3);

	context.fillStyle = "#CCC";
	context.fillRect(canvasWidth / 2 - 310, canvasHeight / 2 + 50, 300, 180);
	context.fillRect(canvasWidth / 2 + 10, canvasHeight / 2 + 50, 300, 180);
	context.fillStyle = "#222";
	context.font = "30px Verdana";
	context.fillText("Gamemode 1", canvasWidth / 2 - 160, canvasHeight / 2 + 155);
	context.fillText("Gamemode 2", canvasWidth / 2 + 160, canvasHeight / 2 + 155);
	document.addEventListener("click", mouseClick);
}

function mouseClick(element) {
	var x = element.pageX;
	var y = element.pageY;
	if (x >= canvasWidth / 2 - 310 && x < canvasWidth / 2 - 310 + 300 && y >= canvasHeight / 2 + 50 && y < canvasHeight / 2 + 50 + 180) {
		game1();
		document.removeEventListener("click", mouseClick);
	}
	if (x >= canvasWidth / 2 + 10 && x < canvasWidth / 2 + 10 + 300 && y >= canvasHeight / 2 + 50 && y < canvasHeight / 2 + 50 + 180) {
		game2();
		document.removeEventListener("click", mouseClick);
	}
}