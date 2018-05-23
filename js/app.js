// Creating an enemy class with the constructor function
class Enemy {
  constructor(y) {
    this.x = -20; //looks smoother for bugs to crawl in rather than appear at this.x = 0
    this.y = y;
    this.speed = Math.random() * (420 - 70) + 70;
    this.sprite = 'images/enemy-bug.png';
    this.width = 50;
    this.height = 30;
  }
  // Methods within the class objects

  // Creating and updating the speed i.e. position of the enemy
  update(dt) {
    // scenario ---> Canvas edge limits
    this.x += this.speed * dt;

    if (this.x > 450) { //allow bugs to run off screen instead of just disappearing
      this.x = -20;
      this.speed = Math.random() * (440 - 70) + 70; // reassign random speed
    }
    // scenario ---> collision with player; code structure from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (this.x < player.x + player.width &&
      this.x + this.width > player.x &&
      this.y < player.y + (player.height / 2) &&
      this.y + this.height > player.y) {

      alert('Ouch, you ran into a bug');

      resetGame();
    }
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

}

class Player {
  constructor(sprite) {
    this.x = 202.5;
    this.y = 400;
    this.speed = 101;
    this.sprite = sprite;
    this.width = 30;
    this.height = 50;
  }

  update(dt) {

    // scenario --> Canvas edge limits
    if (this.x >= 430) {
      this.x = 404.5;
      // console.log("I ran off  x"); --> test purposes
    } else if (this.x < 0) {
      this.x = 0;
      // console.log("I ran below 0 x"); --> test purposes
    } else if (this.y > 400) {
      this.y = 400;
      // console.log("I ran off 400 y")--> test purposes
    }

    // scenario -- > player reaches water // alert and reset
    else if (this.y + this.height < 20) {

      setTimeout(function(){alert('Congratulations, you won!'); }, 80);
      resetGame();
      }
  }


  // Moving the player
  handleInput(allowedKeys) {
    if (allowedKeys === 'left') {
      this.x -= 101;
    }
    if (allowedKeys === 'right') {
      this.x += 101;
    }
    if (allowedKeys === 'down') {
      this.y += 90;
    }
    if (allowedKeys === 'up') {
      this.y -= 90;
    }
  }

  // Movement multiplied by dt parameter to ensure the game runs at the same speed for
  // all computers.

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

let allEnemies = [
  new Enemy(55),
  // new Enemy(55), //potential to add morre bugs for difficulty
  new Enemy(140),
  new Enemy(225),
  new Enemy(310)
];



// Place the player object in a variable called player

const player = new Player('images/char-pink-girl.png');


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

// in scenario collision or scenario win, the player and the enemies need to be reset
function resetGame() {

  player.x = 202.5;
  player.y = 400;

  setTimeout(function(){
    allEnemies.forEach(function(enemy) {
    enemy.x = -100;
    enemy.speed = Math.random() * (420 - 70) + 70;
  });}, 100);
}
