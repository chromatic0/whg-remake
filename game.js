const deathSound = new Audio('sound/death.mp3');
const completeSound = new Audio('sound/complete.mp3');

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

W = 540;
H = 120;

canvas.width = W;
canvas.height = H;

currentLevelIndex = 0;
level = null;
square = null;

const levels = [
  { //level one
    start: {x: 0, y: 0, w: 90, h: 120},
    end: {x: 450, y: 0, w: 90, h: 120},
    circles: [
    { x: 135, y: 15, size: 9, dx: 0, dy: 1.5, color:"#0000FF"},
    { x: 225, y: 45, size: 9, dx: 0, dy: 1.5, color:"#0000FF"},
    { x: 315, y: 75, size: 9, dx: 0, dy: 1.5, color:"#0000FF"},
    { x: 405, y: 105, size: 9, dx: 0, dy: 1.5, color:"#0000FF"},
    { x: 495, y: 135, size: 9, dx: 0, dy: 1.5, color:"#0000FF"},
    ],
    areaW: 540,
    areaH: 120
  },

  { //level two
    start: {x: 0, y: 0, w: 90, h: 30},
    end: {x: 210, y: 240, w: 90, h: 60},
    circles: [
    { x: 15, y: 45, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 45, y: 45, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 75, y: 45, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 105, y: 45, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 135, y: 45, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 165, y: 45, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 195, y: 45, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 225, y: 45, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},

    { x: 285, y: 105, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 255, y: 105, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 225, y: 105, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 195, y: 105, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 165, y: 105, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 135, y: 105, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 105, y: 105, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 75, y: 105, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},


    { x: 15, y: 165, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 45, y: 165, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 75, y: 165, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 105, y: 165, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 135, y: 165, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 165, y: 165, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 195, y: 165, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 225, y: 165, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},

    { x: 285, y: 225, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 255, y: 225, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 225, y: 225, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 195, y: 225, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 165, y: 225, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 135, y: 225, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 105, y: 225, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 75, y: 225, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},

    { x: 75, y: 255, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 135, y: 285, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
    { x: 195, y: 255, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},

    { x: 15, y: 285, size: 9, dx: -1, dy: 1, color:"#8400ff"},
    { x: 150, y: 285, size: 9, dx: 0, dy: 1, color:"#8400ff"}
    ],
    areaW: 300,
    areaH: 300
  } 
]

const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});


function drawBackground() {
  const tile = 30;

  ctx.clearRect(0, 0, W, H);

  for (let y = 0; y < H; y += tile) {
    for (let x = 0; x < W; x += tile) {
      ctx.fillStyle =
        ((x / tile + y / tile) % 2 === 0)
          ? "#E6E6FF"
          : "#F7F7FF";

      ctx.fillRect(x, y, tile, tile);
    }
  }
}

function drawStartPoint() {
  ctx.fillStyle = "#B5FEB4";
  ctx.fillRect(level.start.x, level.start.y, level.start.w, level.start.h);
}

function drawEndPoint() {
  ctx.fillStyle = "#B5FEB4";
  ctx.fillRect(level.end.x, level.end.y, level.end.w, level.end.h);
}

function drawCircles() {
  for (let circle of level.circles) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.arc(circle.x, circle.y, 9, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = `${circle.color}`;
    ctx.fill();
    ctx.closePath();
  }
}

function drawSquare() {
  
  ctx.fillStyle = `rgba(255, 0, 0, ${square.fade})`;
  ctx.fillRect(square.x, square.y, square.size, square.size);

  ctx.lineWidth = 4;
  ctx.strokeStyle = `rgba(0, 0, 0, ${square.fade})`;
  ctx.strokeRect(square.x, square.y, square.size, square.size);
}

function update() {

  if (!square.dead) {
    if (keys["ArrowUp"] || keys["w"] || keys["W"]) square.y -= 0.9;
    if (keys["ArrowDown"] || keys["s"] || keys["S"]) square.y += 0.9;
    if (keys["ArrowLeft"] || keys["a"] || keys["A"]) square.x -= 0.9;
    if (keys["ArrowRight"] || keys["d"] || keys["D"]) square.x += 0.9;

    square.x = Math.max(0, Math.min(canvas.width - square.size, square.x));
    square.y = Math.max(0, Math.min(canvas.height - square.size, square.y));

    squareHitBoxX = square.x + square.size / 2;
    squareHitBoxY = square.y + square.size / 2;

    if (squareHitBoxX <= level.end.x + level.end.w + 10 && squareHitBoxX >= level.end.x - 10
        && squareHitBoxY <= level.end.y + level.end.h + 10 && squareHitBoxY >= level.end.y - 10) {
          completeSound.play();
          loadLevel(++currentLevelIndex);
      }

    for (let circle of level.circles) {
      if (squareHitBoxX <= circle.x + 18 && squareHitBoxX >= circle.x - 18
        && squareHitBoxY <= circle.y + 18 && squareHitBoxY >= circle.y - 18) {

          deathSound.play();
          square.dead = true;
      }
    }

  } else {
    square.fade -= 0.015;
    if (square.fade <= 0) {
      square.x = level.start.x + level.start.w / 2  - 10;
      square.y = level.start.y + level.start.h / 2 - 10;
      square.fade = 1.0;
      square.dead = false;
    }
  }

  for (let circle of level.circles) {
      circle.x += circle.dx;
      circle.y += circle.dy;

      if (circle.x <= circle.size || circle.x >= canvas.width - circle.size) {
        circle.dx *= -1;
      }
      if (circle.y <= circle.size || circle.y >= canvas.height - circle.size) {
        circle.dy *= -1;
      }
    }
}

function loadLevel(index) {
  level = levels[index];
  currentLevelIndex = index;

  square = {
    x: level.start.x + level.start.w / 2 - 10,
    y: level.start.y + level.start.h / 2 - 10,
    dead: false,
    size: 20,
    fade: 1.0
  }

  W = level.areaW;
  H = level.areaH;

  canvas.width = W;
  canvas.height = H;
}

function loop() {
  update();
  drawBackground();
  drawStartPoint();
  drawEndPoint();
  drawCircles();
  drawSquare();
  
  requestAnimationFrame(loop);
}

loadLevel(1);
loop();