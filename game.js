const deathSound = new Audio('sound/death.mp3');
const completeSound = new Audio('sound/complete.mp3');
const coinSound = new Audio('sound/coin.mp3');

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const Y_OFFSET = 100;
const X_OFFSET = 200;

W = null;
H = null;

canvas.width = null;
canvas.height = null;

deaths = 0;



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
    ],
    coins: [],
    areaW: 540,
    areaH: 120,
    color: "#b4b5fe",
    coinsCollected: 0
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

      { x: 15, y: 285, size: 9, dx: -1, dy: 1, color:"#0000ff"},
      { x: 150, y: 285, size: 9, dx: 0, dy: 1, color:"#0000ff"}
    ],
    coins: [],
    areaW: 300,
    areaH: 300,
    color: "#b4b5fe",
    coinsCollected: 0
  },

  { //level three
    start: {x: 0, y: 0, w: 60, h: 60},
    end: {x: 150, y: 150, w: 60, h: 60},
    circles: [
      { x: 135, y: 75, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
      { x: 195, y: 75, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},

      { x: 75, y: 135, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},
      { x: 75, y: 195, size: 9, dx: 0, dy: 0, color:"#4b4b4b"},

      { x: 75, y: 15, size: 9, dx: 0, dy: 2.5, color:"#0000FF"},
      { x: 75, y: 15, size: 9, dx: 0, dy: 0.5, color:"#0000FF"},

      { x: 75, y: 75, size: 9, dx: 2.5, dy: 0, color:"#0000FF"},
      { x: 75, y: 75, size: 9, dx: 0.5, dy: 0, color:"#0000FF"}
    ],
    coins: [
      { x: 15, y: 195, size: 9, collected: false},
      { x: 195, y: 15, size: 9, collected: false}
    ],
    areaW: 210,
    areaH: 210,
    color: "#b4b5fe",
    coinsCollected: 0
  },
]

const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function drawText() {

  ctx.clearRect(0, -20, canvas.width, Y_OFFSET);

  ctx.textAlign = "center";
  ctx.font = "30px Oswald";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.lineJoin = "round";
  ctx.strokeText(`LEVEL ${currentLevelIndex+1}`, W/2 + X_OFFSET/2, 35);
  ctx.fillStyle = "white";
  ctx.fillText(`LEVEL ${currentLevelIndex+1}`, W/2 + X_OFFSET/2, 35);

  ctx.textAlign = "left";
  ctx.font = "24px Oswald";
  const p1 = "DEATHS: ";
  const p2 = `${deaths}`;
  const totalWidth = ctx.measureText(p1).width + ctx.measureText(p2).width;
  const startingX = W/2 + X_OFFSET/2 - totalWidth/2

  
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.lineJoin = "round";
  ctx.strokeText(p1, startingX, 65);
  ctx.strokeText(p2, startingX + ctx.measureText(p1).width, 65);
  ctx.fillStyle = "white";
  ctx.fillText(p1, startingX, 65);

  ctx.fillStyle = "red";
  ctx.fillText(p2, startingX + ctx.measureText(p1).width, 65);

  ctx.lineJoin = "miter";
  
}

function drawBackground() {
  
  const tile = 30;

  ctx.clearRect(0, 0, W, H);

  ctx.strokeStyle = "black";
  ctx.lineWidth = 10;
  ctx.strokeRect(X_OFFSET/2, Y_OFFSET - 10, W, H);

  for (let y = 0; y < H; y += tile) {
    for (let x = 0; x < W; x += tile) {
      ctx.fillStyle =
        ((x / tile + y / tile) % 2 === 0)
          ? "#E6E6FF"
          : "#F7F7FF";

      ctx.fillRect(x + X_OFFSET/2, y + Y_OFFSET - 10, tile, tile);
    }
  }

}

function drawStartPoint() {
  ctx.fillStyle = "#B5FEB4";
  ctx.fillRect(level.start.x + X_OFFSET/2, level.start.y + Y_OFFSET - 10, level.start.w, level.start.h);
}

function drawEndPoint() {
  ctx.fillStyle = "#B5FEB4";
  ctx.fillRect(level.end.x + X_OFFSET/2, level.end.y + Y_OFFSET - 10, level.end.w, level.end.h);
}

function drawCircles() {
  for (let circle of level.circles) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.arc(circle.x + X_OFFSET/2, circle.y + Y_OFFSET - 10, 9, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(circle.x + X_OFFSET/2, circle.y + Y_OFFSET - 10, 5, 0, Math.PI * 2);
    ctx.fillStyle = `${circle.color}`;
    ctx.fill();
    ctx.closePath();
  }
}

function drawCoins() {
  for (let coin of level.coins) {
    if (!coin.collected) {
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.arc(coin.x + + X_OFFSET/2, coin.y + Y_OFFSET - 10, 9, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(coin.x + + X_OFFSET/2, coin.y + Y_OFFSET - 10, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffff00";
      ctx.fill();
      ctx.closePath();
    }
  }
}

function drawSquare() {
  
  ctx.fillStyle = `rgba(255, 0, 0, ${square.fade})`;
  ctx.fillRect(square.x + X_OFFSET/2, square.y + Y_OFFSET - 10, square.size, square.size);

  ctx.lineWidth = 4;
  ctx.strokeStyle = `rgba(0, 0, 0, ${square.fade})`;
  ctx.strokeRect(square.x + X_OFFSET/2, square.y + Y_OFFSET - 10, square.size, square.size);
}

function update() {

  if (!square.dead) {
    if (keys["ArrowUp"] || keys["w"] || keys["W"]) square.y -= 0.9;
    if (keys["ArrowDown"] || keys["s"] || keys["S"]) square.y += 0.9;
    if (keys["ArrowLeft"] || keys["a"] || keys["A"]) square.x -= 0.9;
    if (keys["ArrowRight"] || keys["d"] || keys["D"]) square.x += 0.9;

    square.x = Math.max(0, Math.min(W - square.size, square.x));
    square.y = Math.max(0, Math.min(H - square.size, square.y));

    squareHitBoxX = square.x + square.size / 2;
    squareHitBoxY = square.y + square.size / 2;

    if (level.coinsCollected == level.coins.length
        && squareHitBoxX <= level.end.x + level.end.w + 10 && squareHitBoxX >= level.end.x - 10
        && squareHitBoxY <= level.end.y + level.end.h + 10 && squareHitBoxY >= level.end.y - 10) {
          completeSound.play();
          loadLevel(++currentLevelIndex);
      }

    for (let circle of level.circles) {
      if (!square.dead
        && squareHitBoxX <= circle.x + 18 && squareHitBoxX >= circle.x - 18
        && squareHitBoxY <= circle.y + 18 && squareHitBoxY >= circle.y - 18) {
          deathSound.play();
          square.dead = true;
          deaths++;
      }
    
      for (let coin of level.coins) {
        if (!coin.collected && squareHitBoxX <= coin.x + 18 && squareHitBoxX >= coin.x - 18
          && squareHitBoxY <= coin.y + 18 && squareHitBoxY >= coin.y - 18) {
            coinSound.play();
            coin.collected = true;
            level.coinsCollected++;
        }
      }
    }

  } else {
    square.fade -= 0.015;
    if (square.fade <= 0) {
      for (let coin of level.coins) {
        if (coin.collected) {coin.collected = false;}
        level.coinsCollected = 0;
      }

      square.x = level.start.x + level.start.w / 2  - 10;
      square.y = level.start.y + level.start.h / 2 - 10;
      square.fade = 1.0;
      square.dead = false;
    }
  }

  for (let circle of level.circles) {
      circle.x += circle.dx;
      circle.y += circle.dy;

      if (circle.x <= circle.size || circle.x >= W - circle.size) {
        circle.dx *= -1;
      }
      if (circle.y <= circle.size || circle.y >= H - circle.size) {
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

  canvas.width = W + X_OFFSET;
  canvas.height = H + Y_OFFSET;

  document.body.style.background = `${level.color}`;;
}

function loop() {
  update();
  drawBackground();
  drawStartPoint();
  drawEndPoint();
  drawCoins();
  drawCircles();
  drawSquare();
  drawText();
  
  requestAnimationFrame(loop);
}

loadLevel(0);
loop();