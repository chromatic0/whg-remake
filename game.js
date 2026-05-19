const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const W = 540;
const H = 120;

canvas.width = W;
canvas.height = H;


const square = {
  x: 50,
  y: 50,
  size: 20,
  speed: 1.2
};

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
  for (let c of circles) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.arc(c.x, c.y, 9, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(c.x, c.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    
    ctx.closePath();
    }
}

function drawSquare() {
  ctx.fillStyle = "rgb(255,0,0)";
  ctx.fillRect(square.x, square.y, square.size, square.size);

  ctx.lineWidth = 4;
  ctx.strokeStyle = "black";
  ctx.strokeRect(square.x, square.y, square.size, square.size);
}

circle_direction = -1;

function update() {
  if (keys["ArrowUp"] || keys["w"]) square.y -= square.speed;
  if (keys["ArrowDown"] || keys["s"]) square.y += square.speed;
  if (keys["ArrowLeft"] || keys["a"]) square.x -= square.speed;
  if (keys["ArrowRight"] || keys["d"]) square.x += square.speed;


  square.x = Math.max(0, Math.min(canvas.width - square.size, square.x));
  square.y = Math.max(0, Math.min(canvas.height - square.size, square.y));

  for (let c of circles) {

    c.x += c.dx;
    c.y += c.dy;

    if (c.x <= c.size || c.x >= canvas.width - c.size) {
      c.dx *= -1;
    }
    if (c.y <= c.size || c.y >= canvas.height - c.size) {
      c.dy *= -1;
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