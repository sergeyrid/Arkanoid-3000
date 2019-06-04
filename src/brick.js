export default class Brick {
  constructor(game, position, id) {
    this.game = game;

    this.width = 100;
    this.height = 40;
    this.id = id;
    this.position = position;

    switch (this.id) {
      case 3:
      this.image = document.getElementById("brickImg3");
      break;
      case 2:
        this.image = document.getElementById("brickImg2");
        break;
      case 1:
        this.image = document.getElementById("brickImg1");
        break;
    }
  }

  draw(ctx) {
    if (this.id > 0) {
      switch (this.id) {
        case 2:
          this.image = document.getElementById("brickImg2");
          break;
        case 1:
          this.image = document.getElementById("brickImg1");
          break;
      }
      ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
  }

  move(deltaTime) {}
}
