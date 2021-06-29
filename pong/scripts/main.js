var paddlewidth = 15;
var paddleheight = 100;
var ballSize = 10;

var paddle1x = 20;
var paddle1y = 300;
var paddle2x = 780;
var paddle2y = 300;

var paddle1v = 0;
var paddle2v = 0;

var score1 = 0;
var score2 = 0;

var speed = 4.5;

var ballx = 400;
var bally = 300;

var lastBallSpeedY = 0;

var ballSpeedx = 0;
var ballSpeedy = 0;

var canvasWidth = 800;
var canvasHeight = 600;

var up = false;
var down = false;

var canvas, context;

var aitarget = 0;

window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("2d");
	reset();
	setInterval(gameTick, 1000 / 30);
	document.addEventListener("keydown", move);
	document.addEventListener("keyup", unMove);
}

function gameTick() {
	context.fillStyle = "black";
	context.fillRect(0, 0, canvasWidth, canvasHeight);
	ballx += ballSpeedx;
	bally += ballSpeedy;
	if (up && paddle1y > paddleheight / 2) {
		paddle1y -= speed;
	}
	if (down && canvasHeight - paddle1y > paddleheight / 2) {
		paddle1y += speed;
	}

	if (bally - ballSize / 2 <= 0 && ballSpeedy < 0) {
		ballSpeedy *= -1;
	}

	if (bally + ballSize / 2 >= canvasHeight && ballSpeedy > 0) {
		ballSpeedy *= -1;
	}

	if (ballx - ballSize / 2 <= paddle1x + paddlewidth / 2 && ballSpeedx < 0) {
		if (Math.abs(paddle1y - bally) > Math.abs(paddleheight / 2 + ballSize / 2)) {
			score2 += 1;
			reset();
		} else {
			ballSpeedx *= -1;
			ballSpeedx *= 1.05;
			lastBallSpeedY *= 1.05;
			ballSpeedy = lastBallSpeedY * Math.abs(paddle1y - bally) / (paddleheight / 2);
			if (bally < paddle1y) {
				ballSpeedy *= -1;
			}
		}
	}

	if (ballx + ballSize / 2 >= paddle2x - paddlewidth / 2 && ballSpeedx > 0) {
		if (Math.abs(paddle2y - bally) > Math.abs(paddleheight / 2 + ballSize / 2)) {
			score1 += 1;
			reset();
		} else {
			ballSpeedx *= -1;
			ballSpeedx *= 1.05;
			lastBallSpeedY *= 1.05;
			ballSpeedy = lastBallSpeedY * Math.abs(paddle2y - bally) / (paddleheight / 2);
			if (bally < paddle2y) {
				ballSpeedy *= -1;
			}
		}
	}

	if (ballx > canvasWidth / 2 && ballSpeedx > 0) {
		aitarget = bally;
	} else {
		aitarget = canvasHeight / 2;
	}

	if (aitarget > paddle2y) {
		paddle2y += aitarget - paddle2y < speed ? aitarget - paddle2y : speed;
		paddle2y = paddle2y > canvasHeight - paddleheight / 2 ? canvasHeight - paddleheight / 2 : paddle2y;
	} else {
		paddle2y -= paddle2y - aitarget < speed ? paddle2y - aitarget : speed;
		paddle2y = paddle2y < paddleheight / 2 ? paddleheight / 2 : paddle2y;
	}

	context.fillStyle = "white";
	context.fillRect(ballx - ballSize / 2, bally - ballSize / 2, ballSize, ballSize);
	context.fillRect(paddle1x - paddlewidth / 2, paddle1y - paddleheight / 2, paddlewidth, paddleheight);
	context.fillRect(paddle2x - paddlewidth / 2, paddle2y - paddleheight / 2, paddlewidth, paddleheight);

}

function reset() {
	paddle1y = canvasHeight / 2;
	paddle2y = canvasHeight / 2;
	ballx = canvasWidth / 2;
	bally = canvasHeight /2;
	ballSpeedx = Math.ceil(Math.random() * 3) + 2;
	ballSpeedy = Math.ceil(Math.random() * 3) + 2;
	lastBallSpeedY = ballSpeedy;
	if (Math.random() > 0.5) {
		ballSpeedx *= -1;
	} 
	if (Math.random() > 0.5) {
		ballSpeedy *= -1;
	}
	document.getElementById("playerscore").innerText = "Score: " + score1;
	document.getElementById("computerscore").innerText = "Score: " + score2;
}

function move(event) {
	var keycode = event.keycode ? event.keycode : event.which;
	switch(keycode) {
		case 38:
		case 87:
			up = true;
			break;
		case 40:
		case 83:
			down = true;
			break;
	}
}

function unMove(event) {
	var keycode = event.keycode ? event.keycode : event.which;
	switch(keycode) {
		case 38:
		case 87:
			up = false;
			break;
		case 40:
		case 83:
			down = false;
			break;
	}
}