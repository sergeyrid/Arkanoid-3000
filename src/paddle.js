export default class Paddle {
  constructor(game) {
    this.image = document.getElementById("paddleImg");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.width = 130;
    this.height = 40;
    this.maxSpeed = 0.6;
    this.speed = 0;

    this.position = {
      x: this.gameWidth / 2 - this.width / 2,
      y: this.gameHeight - this.height - 10
    };
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }

  move(deltaTime) {
    this.position.x += this.speed * deltaTime;
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x + this.width > this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }
  }
}
