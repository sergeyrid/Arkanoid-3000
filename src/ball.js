export default class Ball {
  constructor(game) {
    this.image = document.getElementById("ballImg");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;

    this.size = this.gameHeight * 0.06;

    this.position = {
      x: Math.random() * (this.gameWidth - this.size),
      y: this.gameHeight * 0.8
    };

    this.speed = {
      x: this.gameWidth * 0.000375,
      y: -this.gameHeight * 0.0004
    };

    this.delta = this.gameHeight * 0.02;
  }

  hitSound() {
    var hit = new Audio();
    hit.src = "./audio/404769__owlstorm__retro-video-game-sfx-bounce.wav";
    hit.autoplay = true;
    hit.volume = 0.06 * this.game.volume;
  }

  deathSound() {
    var death = new Audio();
    death.src = "./audio/442127__euphrosyyn__8-bit-game-over.wav";
    death.autoplay = true;
    death.volume = 0.3 * this.game.volume;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  borderCollisionCheck() {
    if (this.position.x < 0) {
      this.position.x = 0;
      this.speed.x = -this.speed.x;
      this.hitSound();
    }
    if (this.position.y < 0) {
      this.position.y = 0;
      this.speed.y = -this.speed.y;
      this.hitSound();
    }
    if (this.position.x + this.size > this.gameWidth) {
      this.position.x = this.gameWidth - this.size;
      this.speed.x = -this.speed.x;
      this.hitSound();
    }
    if (this.position.y + this.size > this.gameHeight) {
      this.position.y = this.gameHeight - this.size;
      this.speed.y = -this.speed.y;
      this.hitSound();
    }
  }

  collision(object) {
    let minY = Math.min(
      Math.abs(this.position.y + this.size - object.position.y),
      Math.abs(this.position.y - object.position.y - object.height)
    );
    let minX = Math.min(
      Math.abs(this.position.x + this.size - object.position.x),
      Math.abs(this.position.x - object.position.x - object.width)
    );
    if (
      Math.sign(this.speed.x) === Math.sign(this.position.x - object.position.x)
    ) {
      minY = -1;
    }
    if (
      Math.sign(this.speed.y) === Math.sign(this.position.y - object.position.y)
    ) {
      minX = -1;
    }
    if (minX < minY) {
      this.speed.x = -this.speed.x;
      if (this.position.x - object.position.x < 0) {
        this.position.x -= this.delta;
      } else {
        this.position.x += this.delta;
      }
    } else {
      this.speed.y = -this.speed.y;
      if (this.position.y - object.position.y < 0) {
        this.position.y -= this.delta;
      } else {
        this.position.y += this.delta;
      }
    }
  }

  paddleCollisionCheck() {
    if (
      this.position.y < this.game.paddle.position.y + this.game.paddle.height &&
      this.position.y + this.size > this.game.paddle.position.y &&
      this.position.x < this.game.paddle.position.x + this.game.paddle.width &&
      this.position.x + this.size > this.game.paddle.position.x
    ) {
      this.collision(this.game.paddle);
      this.hitSound();
    }
  }

  brickCollisionCheck() {
    let done = false;
    this.game.bricks.forEach(element => {
      if (
        !done &&
        this.position.y < element.position.y + element.height &&
        this.position.y + this.size > element.position.y &&
        this.position.x < element.position.x + element.width &&
        this.position.x + this.size > element.position.x
      ) {
        this.collision(element);
        element.id--;
        if (element.id == 0) {
          this.game.score += 100;
        } else {
          this.game.score += 10;
        }
        document.getElementById("scoreValue").innerHTML = this.game.score;
        this.hitSound();
        done = true;
      }
    });
  }

  deathCheck() {
    if (
      this.position.y + this.size - this.delta >
      this.game.paddle.position.y
    ) {
      this.game.curState = this.game.gameStates.DEATH;
      this.deathSound();
    }
  }

  move(deltaTime) {
    if (this.speed.x > 0) {
      this.position.x += Math.min(this.speed.x * deltaTime, 9);
    } else {
      this.position.x += Math.max(this.speed.x * deltaTime, -9);
    }

    if (this.speed.y > 0) {
      this.position.y += Math.min(this.speed.y * deltaTime, 6);
    } else {
      this.position.y += Math.max(this.speed.y * deltaTime, -6);
    }

    this.borderCollisionCheck();
    this.paddleCollisionCheck();
    this.brickCollisionCheck();

    this.deathCheck();
  }
}
