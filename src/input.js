export default class InputHandler {
  constructor(game) {
    function pauseSound() {
      var pause = new Audio();
      pause.src = "./audio/448264__henryrichard__sfx-danger.wav";
      pause.autoplay = true;
      pause.volume = 0.5 * game.volume;
    }

    document.getElementById("up").addEventListener("click", event => {
      let v = Number(document.getElementById("volumeValue").innerHTML) + 1;
      document.getElementById("volumeValue").innerHTML = Math.min(v, 100);
      if (v > 9 && v < 100) {
        document.getElementById("up").style.left = "190px";
        document.getElementById("down").style.left = "190px";
      } else if (v > 99) {
        document.getElementById("up").style.left = "210px";
        document.getElementById("down").style.left = "210px";
      } else {
        document.getElementById("up").style.left = "170px";
        document.getElementById("down").style.left = "170px";
      }
      game.changeVolume();
    })

    document.getElementById("down").addEventListener("click", event => {
      let v = Number(document.getElementById("volumeValue").innerHTML) - 1;
      document.getElementById("volumeValue").innerHTML = Math.max(v, 0);
      if (v > 9 && v < 100) {
        document.getElementById("up").style.left = "190px";
        document.getElementById("down").style.left = "190px";
      } else if (v > 99) {
        document.getElementById("up").style.left = "210px";
        document.getElementById("down").style.left = "210px";
      } else {
        document.getElementById("up").style.left = "170px";
        document.getElementById("down").style.left = "170px";
      }
      game.changeVolume();
    })

    document.getElementById("restart").addEventListener("click", event => {
      game.levelNum = 0;
      game.highScore = Math.max(game.score, game.highScore);
      document.getElementById("highScoreValue").innerHTML = game.highScore;
      game.score = 0;
      game.start();
    })

    document.addEventListener("keypress", event => {
      if (game.curState == game.gameStates.DEATH) {
        game.levelNum = 0;
        game.start();
      } else {
        if (event.keyCode === 32) {
          if (game.curState == game.gameStates.GAME) {
            game.curState = game.gameStates.PAUSE;
            pauseSound();
          } else {
            game.curState = game.gameStates.GAME;
            document.getElementById("scoreValue").innerHTML = game.score;
            pauseSound();
          }
        }
      }
    });

    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          game.paddle.speed = -game.paddle.maxSpeed;
          break;
        case 39:
          game.paddle.speed = game.paddle.maxSpeed;
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          if (game.paddle.speed < 0) {
            game.paddle.speed = 0;
          }
          break;
        case 39:
          if (game.paddle.speed > 0) {
            game.paddle.speed = 0;
          }
          break;
      }
    });
  }
}
