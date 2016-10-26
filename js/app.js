//Sets the edges of the enemy images
function edges() {
    this.halfHeight = 37;
    this.halfWidth = 50;
    this.boxUp = this.y - this.halfHeight;
    this.boxDown = this.y + this.halfHeight;
    this.boxLeft = this.x - this.halfWidth;
    this.boxRight = this.x + this.halfWidth;
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 711) {
        this.x = -105;
    }

    edges.call(this);
    // Detects if the player collides with the enemy.
    if (player.y > this.boxUp && player.y < this.boxDown && player.x > this.boxLeft && player.x < this.boxRight) {
        player.playerReset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player class
var Player = function(x, y) {
    this.startingX = x;
    this.startingY = y;
    this.x = x;
    this.y = y;
    this.moveVertical = 85;
    this.moveHorizontal = 100;
    this.sprite = 'images/char-boy.png';
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handle and move player. conditions keep player within
//bounds of the canvas
Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case 'up':
            if (this.y < 100) {
                player.playerReset();
            } else {
                this.y -= this.moveVertical;
            }
            break;
        case 'down':
            if (this.y > 300) {
                return null;
            } else {
                this.y += this.moveVertical;
            }
            break;
        case 'left':
            if (this.x === 0) {
                return null;
            } else {
                this.x -= this.moveHorizontal;
            }
            break;
        case 'right':
            if (this.x == 400) {
                return null;
            } else {
                this.x += this.moveHorizontal;
            }
            break;
    }
};

//method to return player to starting point
Player.prototype.playerReset = function() {
    this.x = this.startingX;
    this.y = this.startingY
};

//Instantiate a new player object
var player = new Player(200, 400);

var allEnemies = [];
/*
//Instantiate all Enemy objects
var enemy1 = new Enemy(350, 300, 50);
var enemy2 = new Enemy(200, 210, 100);
var enemy3 = new Enemy(200, 140, 200);
var enemy4 = new Enemy(100, 45, 300);
var enemy5 = new Enemy(300, 45, 300);
var enemy6 = new Enemy(500, 45, 300);
var enemy7 = new Enemy(210, 210, 200);
var enemy8 = new Enemy(100, 300, 50);

//push all enemy objects to array
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8);
*/
// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});