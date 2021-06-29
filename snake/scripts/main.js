var canvas, context;
var posx = 12;
var posy = 12;
var apples = [];
var timeout = 0;
var cellSize = 20;
var gridSize = 25;
var xvelocity = 1;
var yvelocity = 0;
var tail = 5;
var highscore = 0;
var trail = [];
var applecount = 3;
window.onload = function() {
    canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d");
    document.addEventListener("keydown", navigation);

    timeout = setInterval(frame, 1000 / 15);
    for (var i = 0; i < applecount; i++) {
        apples.push({
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        });
        apples[i].x = Math.floor(Math.random() * gridSize);
        apples[i].y = Math.floor(Math.random() * gridSize);
    }
}

function printCell(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * cellSize + 1, y *  cellSize + 1, cellSize - 1, cellSize - 1);
}

function resetCanvas() {
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, cellSize *  gridSize, cellSize *  gridSize);
}

function frame() {
    resetCanvas()
    posx += xvelocity;
    posy += yvelocity;
    if (posx > gridSize - 1) {
        posx = 0;
    }
    if (posx < 0) {
        posx = gridSize - 1;
    }
    if (posy > gridSize - 1) {
        posy = 0;
    }
    if (posy < 0) {
        posy = gridSize - 1;
    }

    printCell(posx, posy, "green");

    for (var i = 0; i < trail.length;  i++) {
        printCell(trail[i].x, trail[i].y, "lime");
        if (posx == trail[i].x && posy == trail[i].y) {
            if (tail > highscore) {
            	highscore = tail;
            	document.getElementById("highscore").innerText = "Highscore: " + highscore;
                localStorage.setItem("highscore", highscore);
            }
            tail = trail.length - i - 1;
        }
    }

    trail.push({
        x: posx,
        y: posy
    });

    while (trail.length > tail) {
        trail.shift();
    }

    for (var i = 0; i <  apples.length; i++) {
        if (i == 0) {
            printCell(apples[i].x, apples[i].y, "blue");
        } else if (i == 1) {
            printCell(apples[i].x, apples[i].y, "red");
        } else {
            printCell(apples[i].x, apples[i].y, "orange");
        }
        if (posx == apples[i].x && posy == apples[i].y) {
            if (i == 0) {
                tail++;
            }
            tail++;
            apples[i].x = Math.floor(Math.random() *  gridSize);
            apples[i].y = Math.floor(Math.random() * gridSize);
        }
    }

    document.getElementById("score").innerText = "Score: " + tail;

}

function navigation(event) {
    var keycode = event.keycode ? event.keycode : event.which;
    switch (keycode) {
    	case 65:
        case 37:
            if (xvelocity == 0) {
                xvelocity = -1;
                yvelocity = 0;
            }
            break;
        case 87:
        case 38:
            if (yvelocity == 0) {
                xvelocity = 0;
                yvelocity = -1;
            }
            break;
        case 68:
        case 39:
            if (xvelocity == 0) {
                xvelocity = 1;
                yvelocity = 0;
            }
            break;
        case 83:
        case 40:
            if (yvelocity == 0) {
                xvelocity = 0;
                yvelocity = 1;
            }
            break;
    }
}