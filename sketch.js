const VIEW_W = 800;
const VIEW_H = 480;

let worldData;
let level;
let player;

let camX = 0;
let camY = 0;
let camVX = 0;
let camVY = 0;

function preload() {
  worldData = loadJSON("world.json");
}

function setup() {
  createCanvas(VIEW_W, VIEW_H);
  textFont("sans-serif");
  textSize(14);

  level = new WorldLevel(worldData);

  const start = worldData.playerStart ?? { x: 600, y: 1000, speed: 1.2 };
  player = new Player(start.x, start.y, start.speed);

  camX = player.x - width / 2;
  camY = player.y - height / 2;
}

function draw() {
  player.updateInput();

  player.x = constrain(player.x, 0, level.w);
  player.y = constrain(player.y, 0, level.h);

  let targetX = player.x - width / 2;
  let targetY = player.y - height / 2;

  const maxCamX = max(0, level.w - width);
  const maxCamY = max(0, level.h - height);

  targetX = constrain(targetX, 0, maxCamX);
  targetY = constrain(targetY, 0, maxCamY);

  const camLerp = level.camLerp;

  camVX += (targetX - camX) * camLerp;
  camVY += (targetY - camY) * camLerp;

  camVX *= 0.9;
  camVY *= 0.9;

  camX += camVX;
  camY += camVY;

  // breathing motion
  camY += sin(frameCount * 0.01) * 1.5;

  level.drawBackground(camX, camY);

  push();
  translate(-camX, -camY);
  level.drawWorld();
  player.draw();
  pop();
}
