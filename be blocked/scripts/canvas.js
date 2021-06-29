function getCanvas() {
	canvas = document.getElementById("gameCanvas");

	canvasWidth = window.innerWidth;
	canvasHeight = window.innerHeight;

	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	context = canvas.getContext("2d");
}