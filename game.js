const deathSound = new Audio('sound/death.mp3');
const completeSound = new Audio('sound/complete.mp3');
const coinSound = new Audio('sound/coin.mp3');

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const Y_OFFSET = 90;
const X_OFFSET = 200;
const HALF_X_OFFSET = X_OFFSET/2;
const TILE = 30;
const CIRCLE_SIZE = 9;
const COIN_SIZE = 9;
const SQUARE_SIZE = 20;

let W = 0;
let H = 0;

let deaths = 0;
let coinsCollected = 0;
let currentLevelIndex = 0;
let level = null;
let square = null;

const levels = [
  { //level one
    start: {x: 0, y: 30, w: 90, h: 60},
    end: {x: 450, y: 30, w: 90, h: 60},
    circles: [
    { x: 135, y: 105, speed: 1.5, path: [{x:135, y:15},{x:135, y:105}], pathIndex: 0, color:"#0000FF"},
    { x: 225, y: 105, speed: 1.5, path: [{x:225, y:15},{x:225, y:105}], pathIndex: 0, color:"#0000FF"},
    { x: 315, y: 105, speed: 1.5, path: [{x:315, y:15},{x:315, y:105}], pathIndex: 0, color:"#0000FF"},
    { x: 405, y: 105, speed: 1.5, path: [{x:405, y:15},{x:405, y:105}], pathIndex: 0, color:"#0000FF"},
    ],
    map: [
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    ],
    coins: [],
    color: "#b4b5fe"
  },

  { //level two
    start: {x: 0, y: 150, w: 60, h: 60},
    end: {x: 450, y: 0, w: 60, h: 60},
    circles: [
    { x: 75, y: 135, speed: 2, path: [{x:75, y:135},{x:435, y:135}], pathIndex: 0, color:"#0000FF"},
    { x: 75, y: 15, speed: 1.5, path: [{x:75, y:15},{x:75, y:195}], pathIndex: 0, color:"#0000FF"},
    { x: 315, y: 15, speed: 0.5, path: [{x:315, y:15},{x:315, y:105}], pathIndex: 0, color:"#0000FF"},
    { x: 405, y: 105, speed: 0.5, path: [{x:405, y:15},{x:405, y:105}], pathIndex: 0, color:"#0000FF"},
    ],
    map: [
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    ],
    coins: [
      { x: 435, y: 195, collected: false}
    ],
    color: "#b4b5fe"
  },

  { //level three
    start: {x: 0, y: 30, w: 60, h: 120},
    end: {x: 570, y: 30, w: 60, h: 120},
    circles: [
      { x: 135, y: 45, speed: 0.5, path: [{x:135, y:15},{x:135, y:75}], pathIndex: 0, color:"#0000FF"},
      { x: 225, y: 135, speed: 1, path: [{x:165, y:135},{x:285, y:135}], pathIndex: 0, color:"#0000FF"},
      { x: 225, y: 135, speed: 0.5, path: [{x:225, y:165},{x:225, y:105}], pathIndex: 0, color:"#0000FF"},
      { x: 315, y: 45, speed: 1.5, path: [{x:255, y:45},{x:375, y:45}], pathIndex: 0, color:"#0000FF"},
      { x: 315, y: 45, speed: 0.5, path: [{x:315, y:15},{x:315, y:75}], pathIndex: 0, color:"#0000FF"},
      { x: 405, y: 135, speed: 1, path: [{x:465, y:135},{x:345, y:135}], pathIndex: 0, color:"#0000FF"},
      { x: 405, y: 135, speed: 0.5, path: [{x:405, y:165},{x:405, y:105}], pathIndex: 0, color:"#0000FF"},
      { x: 495, y: 45, speed: 0.5, path: [{x:495, y:15},{x:495, y:75}], pathIndex: 0, color:"#0000FF"},
    ],
    coins: [
      { x: 165, y: 165, collected: false},
      { x: 285, y: 165, collected: false},
      { x: 255, y: 15, collected: false},
      { x: 375, y: 15, collected: false},
      { x: 345, y: 165, collected: false},
      { x: 465, y: 165, collected: false},

    ],
    map: [
      [0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    ],
    color: "#b4b5fe"
  },


  { //level four
    start: {x: 0, y: 0, w: 90, h: 30},
    end: {x: 210, y: 240, w: 90, h: 60},
    circles: [
      { x: 15, y: 45, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 45, y: 45, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 75, y: 45, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 105, y: 45, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 135, y: 45, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 165, y: 45, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 195, y: 45, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 225, y: 45, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},

      { x: 285, y: 105, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 255, y: 105, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 225, y: 105, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 195, y: 105, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 165, y: 105, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 135, y: 105, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 105, y: 105, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 75, y: 105, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},

      { x: 15, y: 165, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 45, y: 165, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 75, y: 165, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 105, y: 165, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 135, y: 165, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 165, y: 165, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 195, y: 165, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 225, y: 165, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},

      { x: 285, y: 225, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 255, y: 225, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 225, y: 225, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 195, y: 225, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 165, y: 225, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 135, y: 225, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 105, y: 225, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 75, y: 225, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},

      { x: 75, y: 255, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 135, y: 285, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 195, y: 255, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},

      { x: 15, y: 285, speed: 1.5, path: [{x:0, y:305},{x:300, y:0}], pathIndex: 0, color:"#0000ff"},
      { x: 150, y: 285, speed: 1, path: [{x:150, y:300},{x:150, y:15}], pathIndex: 0, color:"#0000ff"}
    ],
    map: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    coins: [],
    color: "#b4b5fe"
  },

  { //level five
    start: {x: 0, y: 0, w: 60, h: 60},
    end: {x: 150, y: 150, w: 60, h: 60},
    circles: [
      { x: 135, y: 75, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 195, y: 75, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},

      { x: 75, y: 135, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 75, y: 195, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},

      { x: 75, y: 15, speed: 2.5, path: [{x:75, y:15},{x:75, y:195}], pathIndex: 0, color:"#0000FF"},
      { x: 75, y: 15, speed: 0.5, path: [{x:75, y:15},{x:75, y:195}], pathIndex: 0, color:"#0000FF"},

      { x: 75, y: 75, speed: 0.5, path: [{x:15, y:75},{x:195, y:75}], pathIndex: 0, color:"#0000FF"},
      { x: 75, y: 75, speed: 2.5, path: [{x:15, y:75},{x:195, y:75}], pathIndex: 0, color:"#0000FF"}
    ],
    coins: [
      { x: 15, y: 195, collected: false},
      { x: 195, y: 15, collected: false}
    ],
    map: [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ],
    color: "#b4b5fe"
  },


  { //level six
    start: {x: 120, y: 30, w: 30, h: 30},
    end: {x: 60, y: 270, w: 30, h: 30},
    circles: [
      { x: 45, y: 105, speed: 1.6, path: [{x:45, y:45},{x:105, y:45},{x:105, y:105},{x:45, y:105}], pathIndex: 0, color:"#0000FF"},
      { x: 105, y: 165, speed: 0.5, path: [{x:105, y:165},{x:105, y:225},{x:45, y:225},{x:45, y:165}], pathIndex: 0, color:"#0000FF"},
      { x: 45, y: 225, speed: 0.5, path: [{x:45, y:225},{x:45, y:165},{x:105, y:165},{x:105, y:225}], pathIndex: 0, color:"#0000FF"},
    ],
    coins: [{ x: 45, y: 15, collected:false},
            { x: 15, y: 165, collected:false},
            { x: 135, y: 165, collected:false}
    ],
    map: [
      [0, 1, 0, 0, 0],
      [0, 1, 1, 1, 1],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0]
    ],
    color: "#b4b5fe"
  },

  { //level seven
    start: {x: 0, y: 0, w: 30, h: 30},
    end: {x: 0, y: 180, w: 30, h: 60},
    circles: [
      { x: 165, y: 45, speed: 1.7, path: [{x:15, y:45},{x:225, y:45}], pathIndex: 0, color:"#0000FF"},
      { x: 165, y: 135, speed: 0.5, path: [{x:165, y:135},{x:285, y:135}], pathIndex: 0, color:"#0000FF"},
      { x: 345, y: 15, speed: 0.92, path: [{x:345, y:15},{x:345, y:225}], pathIndex: 0, color:"#0000FF"},
      { x: 75, y: 195, speed: 1.8, path: [{x:75, y:195},{x:285, y:195}], pathIndex: 0, color:"#0000FF"},

    ],
    coins: [
      { x: 165, y: 135, collected: false}
    ],
    map: [
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1],
    ],
    color: "#b4b5fe"
  },

  { //level eight
    start: {x: 450, y: 210, w: 60, h: 60},
    end: {x: 0, y: 0, w: 60, h: 60},
    circles: [
      { x: 165, y: 255, speed: 3, path: [{x:165, y:10},{x:165, y:260}], pathIndex: 0, color:"#0000FF"},
      { x: 195, y: 255, speed: 1, path: [{x:195, y:10},{x:195, y:260}], pathIndex: 0, color:"#0000FF"},
      { x: 225, y: 255, speed: 0.5, path: [{x:225, y:10},{x:225, y:260}], pathIndex: 0, color:"#0000FF"},
      { x: 255, y: 255, speed: 3, path: [{x:255, y:10},{x:255, y:260}], pathIndex: 0, color:"#0000FF"},
      { x: 285, y: 255, speed: 1, path: [{x:285, y:10},{x:285, y:260}], pathIndex: 0, color:"#0000FF"},
      { x: 315, y: 255, speed: 0.5, path: [{x:315, y:10},{x:315, y:260}], pathIndex: 0, color:"#0000FF"},

      { x: 15, y: 105, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 45, y: 225, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 45, y: 195, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 45, y: 165, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 45, y: 105, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 45, y: 255, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 75, y: 105, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 105, y: 105, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 105, y: 135, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 105, y: 165, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 105, y: 195, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},
      { x: 105, y: 225, speed: 0, path: [], pathIndex: 0, color:"#4b4b4b"},

      { x: 375, y: 15, speed: 0.5, path: [{x:375, y:15},{x:375, y:75}], pathIndex: 0, color:"#0000FF"},
      { x: 375, y: 95, speed: 0.5, path: [{x:375, y:155}, {x:375, y:95}], pathIndex: 0, color:"#0000FF"},
      { x: 375, y: 45, speed: 0.75, path: [{x:375, y:45},{x:495, y:45}], pathIndex: 0, color:"#0000FF"},
      { x: 495, y: 165, speed: 1.2, path: [{x:495, y:165},{x:450, y:75},{x:405,y:165},{x:450, y:75}], pathIndex: 0, color:"#0000FF"},
    ],
    coins: [
      { x: 15, y: 255, collected: false},
      { x: 495, y: 15, collected: false},
      { x: 405, y: 15, collected: false}
    ],
    map: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    color: "#b4b5fe"
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
  ctx.textAlign = "center";
  ctx.font = "30px Oswald";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.lineJoin = "round";
  ctx.strokeText(`LEVEL ${currentLevelIndex+1}`, W/2 + HALF_X_OFFSET, 35);
  ctx.fillStyle = "white";
  ctx.fillText(`LEVEL ${currentLevelIndex+1}`, W/2 + HALF_X_OFFSET, 35);

  ctx.textAlign = "left";
  ctx.font = "24px Oswald";
  const totalWidth = ctx.measureText("DEATHS: ").width + ctx.measureText(deaths).width;
  const startingX = W/2 + HALF_X_OFFSET - totalWidth/2

  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.lineJoin = "round";
  ctx.strokeText("DEATHS: ", startingX, 65);
  ctx.strokeText(deaths, startingX + ctx.measureText("DEATHS: ").width, 65);
  ctx.fillStyle = "white";
  ctx.fillText("DEATHS: ", startingX, 65);
  ctx.fillStyle = "red";
  ctx.fillText(deaths, startingX + ctx.measureText("DEATHS: ").width, 65);
  ctx.lineJoin = "miter";
}

function drawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let row = 0; row < level.map.length; row++) {
    for (let col = 0; col < level.map[0].length; col++) {
      if (level.map[row][col] === 0) continue;
      if ((col + row) % 2 === 0) {
        ctx.fillStyle = "#E6E6FF"
      } else {
        ctx.fillStyle = "#F7F7FF"
      }
      ctx.fillRect(col * TILE + HALF_X_OFFSET, row * TILE + Y_OFFSET, TILE, TILE);
    }
  }
}

function drawStartEndPoints() {
  ctx.fillStyle = "#B5FEB4";
  ctx.fillRect(level.start.x + HALF_X_OFFSET, level.start.y + Y_OFFSET, level.start.w, level.start.h);
  ctx.fillRect(level.end.x + HALF_X_OFFSET, level.end.y + Y_OFFSET, level.end.w, level.end.h);
}

function drawCircles() {
  for (let circle of level.circles) {
    ctx.beginPath();
    ctx.arc(circle.x + HALF_X_OFFSET, circle.y + Y_OFFSET, CIRCLE_SIZE, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(circle.x + HALF_X_OFFSET, circle.y + Y_OFFSET, CIRCLE_SIZE - 4, 0, Math.PI * 2);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
  }
}

function drawCoins() {
  for (let coin of level.coins) {
    if (!coin.collected) {
      ctx.beginPath();
      ctx.arc(coin.x + HALF_X_OFFSET, coin.y + Y_OFFSET, COIN_SIZE, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(coin.x + HALF_X_OFFSET, coin.y + Y_OFFSET, COIN_SIZE - 4, 0, Math.PI * 2);
      ctx.fillStyle = "#ffff00";
      ctx.fill();
      ctx.closePath();
    }
  }
}

function drawSquare() {
  ctx.fillStyle = `rgba(255, 0, 0, ${square.fade})`;
  ctx.fillRect(square.x + HALF_X_OFFSET, square.y + Y_OFFSET, SQUARE_SIZE, SQUARE_SIZE);
  ctx.lineWidth = 4;
  ctx.strokeStyle = `rgba(0, 0, 0, ${square.fade})`;
  ctx.strokeRect(square.x + HALF_X_OFFSET, square.y + Y_OFFSET, SQUARE_SIZE, SQUARE_SIZE);
}

function isWall(px, py) {
  const tx = Math.floor(px / TILE);
  const ty = Math.floor(py / TILE);
  if (ty < 0 || ty >= level.map.length) return true;
  if (tx < 0 || tx >= level.map[0].length) return true;
  return level.map[ty][tx] === 0;
}
 
function squareHitsWall(x, y) {
  const margin = 1;
  const s = SQUARE_SIZE - margin;
  return (
    isWall(x + margin, y + margin) ||
    isWall(x + s, y + margin) ||
    isWall(x + margin, y + s) ||
    isWall(x + s, y + s)
  );
}

function update() {
  if (!square.dead) {
    const prevX = square.x;
    const prevY = square.y;

    if (keys["ArrowUp"] || keys["w"] || keys["W"]) square.y -= 0.9;
    if (keys["ArrowDown"] || keys["s"] || keys["S"]) square.y += 0.9;
    if (keys["ArrowLeft"] || keys["a"] || keys["A"]) square.x -= 0.9;
    if (keys["ArrowRight"] || keys["d"] || keys["D"]) square.x += 0.9;

    if (squareHitsWall(square.x, prevY)) square.x = prevX;
    if (squareHitsWall(prevX, square.y)) square.y = prevY;

    let squareHitBoxX = square.x + SQUARE_SIZE / 2;
    let squareHitBoxY = square.y + SQUARE_SIZE / 2;

    if (coinsCollected === level.coins.length
        && squareHitBoxX <= level.end.x + level.end.w + 10 && squareHitBoxX >= level.end.x - 10
        && squareHitBoxY <= level.end.y + level.end.h + 10 && squareHitBoxY >= level.end.y - 10) {
          completeSound.play();
          coinsCollected = 0;
          loadLevel(currentLevelIndex + 1);
    }

    for (let circle of level.circles) {
      if (!square.dead
        && squareHitBoxX <= circle.x + CIRCLE_SIZE*2 && squareHitBoxX >= circle.x - CIRCLE_SIZE*2
        && squareHitBoxY <= circle.y + CIRCLE_SIZE*2 && squareHitBoxY >= circle.y - CIRCLE_SIZE*2) {
          deathSound.play();
          square.dead = true;
          deaths++;
      }
    }
    
    for (let coin of level.coins) {
      if (!coin.collected && squareHitBoxX <= coin.x + COIN_SIZE*2 && squareHitBoxX >= coin.x - COIN_SIZE*2
        && squareHitBoxY <= coin.y + COIN_SIZE*2 && squareHitBoxY >= coin.y - COIN_SIZE*2) {
          coinSound.play();
          coin.collected = true;
          coinsCollected++;
      }
    }

  } else {
    square.fade -= 0.015;
    if (square.fade <= 0) {
      for (let coin of level.coins) {
        if (coin.collected) {coin.collected = false;}
      }

      coinsCollected = 0;
      square.x = level.start.x + level.start.w / 2 - 10;
      square.y = level.start.y + level.start.h / 2 - 10;
      square.fade = 1.0;
      square.dead = false;
    }
  }

  for (let circle of level.circles) {
    if (!circle.path || circle.path.length === 0) {continue;}

    const targetPath = circle.path[circle.pathIndex];
    const dx = targetPath.x - circle.x;
    const dy = targetPath.y - circle.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= circle.speed) {
      const remainingDist = circle.speed - dist;
      circle.x = targetPath.x;
      circle.y = targetPath.y;
      circle.pathIndex = (circle.pathIndex + 1) % circle.path.length;

      const next = circle.path[circle.pathIndex];
      const ndx = next.x - circle.x;
      const ndy = next.y - circle.y;
      const ndist = Math.sqrt(ndx * ndx + ndy * ndy);
      if (ndist > 0) {
        circle.x += (ndx / ndist) * remainingDist;
        circle.y += (ndy / ndist) * remainingDist;
      }
    } else {
      circle.x += (dx / dist) * circle.speed;
      circle.y += (dy / dist) * circle.speed;
    }
  }
}

function loadLevel(index) {
  if (index >= levels.length) {
    index = 0;
    deaths = 0;
  }

  level = structuredClone(levels[index]);
  currentLevelIndex = index;

  square = {
    x: level.start.x + level.start.w / 2 - 10,
    y: level.start.y + level.start.h / 2 - 10,
    dead: false,
    fade: 1.0
  }

  W = level.map[0].length * TILE;
  H = level.map.length * TILE;

  canvas.width = W + X_OFFSET;
  canvas.height = H + Y_OFFSET;

  document.body.style.background = level.color;
}

function loop() {
  update();
  drawBackground();
  drawStartEndPoints();
  drawCoins();
  drawCircles();
  drawSquare();
  drawText();

  requestAnimationFrame(loop);
}

loadLevel(0);
loop();