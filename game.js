const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const W = 540;
const H = 120;

canvas.width = W;
canvas.height = H;

const circles = [
  { x: 135, y: 15, size: 9, dx: 0, dy: 1.5 },
  { x: 225, y: 45, size: 9, dx: 0, dy: 1.5 },
  { x: 315, y: 75, size: 9, dx: 0, dy: 1.5 },
  { x: 405, y: 105, size: 9, dx: 0, dy: 1.5 },
  { x: 495, y: 135, size: 9, dx: 0, dy: 1.5 },
];

const start = {
  x: 0,
  y: 0,
  w: 90,
  h: 120
}

const square = {
  x: start.x + start.w / 2 - 10,
  y: start.y + start.h / 2 - 10,
  dead: false,
  squareHitBoxX: 0,
  squareHitBoxY: 0,
  size: 20,
  fade: 1.0
};

const end = {
  x: 450,
  y: 0,
  w: 90,
  h: 120
}

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
  ctx.fillRect(start.x, start.y, start.w, start.h);
}

function drawEndPoint() {
  ctx.fillStyle = "#B5FEB4";
  ctx.fillRect(end.x, end.y, end.w, end.h);
}

function drawCircles() {
  for (let circle of circles) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.arc(circle.x, circle.y, 9, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
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
    if (keys["ArrowUp"] || keys["w"]) square.y -= 0.9;
    if (keys["ArrowDown"] || keys["s"]) square.y += 0.9;
    if (keys["ArrowLeft"] || keys["a"]) square.x -= 0.9;
    if (keys["ArrowRight"] || keys["d"]) square.x += 0.9;

    square.x = Math.max(0, Math.min(canvas.width - square.size, square.x));
    square.y = Math.max(0, Math.min(canvas.height - square.size, square.y));

    squareHitBoxX = square.x + square.size / 2;
    squareHitBoxY = square.y + square.size / 2;

    for (let circle of circles) {

      if (squareHitBoxX <= circle.x + 20 && squareHitBoxX >= circle.x - 20
        && squareHitBoxY <= circle.y + 20 && squareHitBoxY >= circle.y - 20) {
          square.dead = true;
      }
    }

  } else {
    square.fade -= 0.015;
    if (square.fade <= 0) {
      square.x = start.x + start.w / 2  - 10;
      square.y = start.y + start.h / 2 - 10;
      square.fade = 1.0;
      square.dead = false;
    }
  }

  for (let circle of circles) {
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

function loop() {
  update();
  drawBackground();
  drawStartPoint();
  drawEndPoint();
  drawCircles();
  drawSquare();
  
  requestAnimationFrame(loop);
}

loop();