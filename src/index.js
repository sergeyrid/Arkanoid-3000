import Game from "./game.js";

var music = new Audio();
music.src = "./audio/251461__joshuaempyre__arcade-music-loop.wav";
music.autoplay = true;
music.loop = true;
music.volume = 0.1;

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

let game = new Game(GAME_WIDTH, GAME_HEIGHT, music);
game.start();

let lastTime = 0;

function gameLoop(curTime) {
  let deltaTime = curTime - lastTime;
  lastTime = curTime;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.move(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);