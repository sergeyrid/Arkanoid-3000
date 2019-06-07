import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import { levels, newLevel } from "./levels.js";

export default class Game {
  constructor(gameWidth, gameHeight, music) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.music = music;
    this.gameStates = {
      MENU: 0,
      PAUSE: 1,
      GAME: 2,
      DEATH: 3
    };
    this.volume = 1;
    this.levelNum = 0;
    this.highScore = 0;
    this.score = 0;
    new InputHandler(this);
  }

  start() {
    this.curState = this.gameStates.MENU;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.level = levels[this.levelNum];

    document.getElementById("levelNum").innerHTML = this.levelNum + 1;

    this.bricks = [];
    newLevel(this, this.level);

    this.objects = [this.paddle, this.ball, ...this.bricks];
  }

  changeVolume() {
    this.volume = Number(document.getElementById("volumeValue").innerHTML) / 50;
    this.music.volume = 0.1 * this.volume;
  }

  move(deltaTime) {
    if (this.curState == this.gameStates.DEATH) {
      this.highScore = Math.max(this.highScore, this.score);
      document.getElementById("highScoreValue").innerHTML = this.highScore;
      this.score = 0;
    } else if (this.curState == this.gameStates.GAME) {
      let bricksNum = 0;
      this.bricks.forEach(element => {
        if (element.id < 1) {
          delete this.bricks[this.bricks.indexOf(element)];
        } else {
          bricksNum++;
        }
      });
      this.objects.forEach(object => object.move(deltaTime));
      if (bricksNum == 0) {
        this.levelNum++;
        this.score += 1000;
        if (this.levelNum === levels.length) {
          this.levelNum = 0;
        }
        this.start();
      }
    }
  }

  draw(ctx) {
    this.objects.forEach(object => object.draw(ctx));
    const textSize = this.gameWidth / 400;
    if (this.curState == this.gameStates.PAUSE) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "red";
      ctx.font = `bold ${textSize}rem 'Press Start 2P'`;
      ctx.fillText(
        "PAUSE",
        this.gameWidth / 2 - this.gameWidth * 0.1,
        this.gameHeight / 2
      );
    } else if (this.curState == this.gameStates.MENU) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "red";
      ctx.font = `bold ${textSize}rem 'Press Start 2P'`;
      ctx.fillText(
        "PRESS SPACEBAR TO START",
        this.gameWidth / 2 - this.gameWidth * 0.4625,
        this.gameHeight / 2
      );
    } else if (this.curState == this.gameStates.DEATH) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "red";
      ctx.font = `bold ${textSize}rem 'Press Start 2P'`;
      ctx.fillText(
        "DEAD",
        this.gameWidth / 2 - this.gameWidth * 0.08125,
        this.gameHeight / 2
      );
      ctx.font = `${textSize / 2}rem 'Press Start 2P'`;
      ctx.fillText(
        "PRESS ANY KEY TO CONTINUE",
        this.gameWidth / 4,
        this.gameHeight / 2 + this.gameHeight * 0.05
      );
    }
  }
}
