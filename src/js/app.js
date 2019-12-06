
const level = document.querySelector('#score').getElementsByTagName('span')[0]
const lives = document.querySelector('#lives').getElementsByTagName('span')[0]

// Sets positon of the sun
class Sun {
 constructor() {
   this.x = 350;
   this.y = 10;
 }
}

//This object tracks and monitors the enemy sprite's actions- direction, speed and also the player's lives left
class Enemy {
  //static lives = 3;

  constructor(x, y, direction, style) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.style = style;
    this.speed = Math.floor(Math.random() * 101) + 100; 
  }

  update(dt) {
    this.direction === 'ltr' ? this.x += (dt * this.speed * (Player.level / 2)) : this.x -= (dt * this.speed * (Player.level / 2));
  
    if (this.x >= 750) {
      this.direction = 'rtl';
    } else if (this.x <= 50) {
      this.direction = 'ltr';
    }
   
    allEnemies.forEach(enemy => {
      if (player.y <= this.y + 100 && player.x <= this.x + 100 && 
        player.y <= this.y + 100 && player.x + 100 >= this.x  &&
        player.y + 100 >= this.y && player.x <= this.x + 100 &&
        player.y + 100 >= this.y && player.x + 100 >= this.x) { 
        player.x = 300;
        player.y = 420;
        this.lives = --Enemy.lives;
        lives.textContent = this.lives;

        if (this.lives === 0) {
          alert(`Game Over!!! You reached level ${Player.level}`);
          window.location.reload();
        }
      }
    });
  }
}

//It controls and tracks the player's movement and the current level of the player
class Player {
  //static level = 1;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    if (this.y <= sun.y + 100 && this.x <= sun.x + 100 && 
      this.y <= sun.y + 100 && this.x + 100 >= sun.x  &&
      this.y + 100 >= sun.y && this.x <= sun.x + 100 &&
      this.y + 100 >= sun.y && this.x + 100 >= sun.x) { 
      this.level = ++Player.level;
      this.x = 300;
      this.y = 420;
      level.textContent = this.level;  
    } 
  }

  handleInput(keypress) {
    if (keypress === 'up' && this.y > 20) {
      this.y -= 100;
    } else if (keypress === 'down' && this.y < 420) {
      this.y += 100;
    } else if (keypress === 'left' && this.x > 50) {
      this.x -= 100;
    } else if (keypress === 'right' && this.x < 750) {
      this.x += 100;
    }
  }
} 

const sun = new Sun()
const player = new Player(300,420)
const allEnemies = [
  new Enemy(50,100, 'rtl', 'enemy1'),
  new Enemy(801,170, 'rtl', 'enemy2' ),
  new Enemy(50,240, 'ltr', 'enemy3' ),
];

document.addEventListener('keyup', function(e) {
  const allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };
  
  player.handleInput(allowedKeys[e.keyCode]);
});

