// Enemies our player must avoid
var Enemy = function (initX, initY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = initX;
    this.y = initY;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Make the enemies move.
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = 0;
        this.randamSpeed();
    };
    
    if (Math.abs(player.x - this.x) < 50 && Math.abs(player.y - this.y) < 50) {
            player.reset();
    };
   

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.randamSpeed = function () {
    var speedRandom = Math.floor(Math.random() * maxSpeedEnemy + minSpeedEnemy);
    this.speed = speedRandom;
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.



var Player = function (PlayerX, PlayerY) {
    this.x = PlayerX;
    this.y = PlayerY;
    this.sprite = 'images/char-horn-girl.png';
};


Player.prototype.update = function (dt) {
    this.x*dt;
    this.y*dt;
    if (this.y < 0) {
        player.reset();
    };
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'up':
            if (this.y > 0)
                this.y = this.y - 90;
            break;
        case 'down':
            if (this.y < 400)
                this.y = this.y + 90;
            break;
        case 'left':
            if (this.x > 0)
                this.x = this.x - 100;
            break;
        case 'right':
            if (this.x < 400)
                this.x = this.x + 100;
            break;
        default:
            return;
    };
    
};


Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [],
    maxSpeedEnemy = 300,
    minSpeedEnemy = 110;

for (var i = 0; i < 4; i++) {
    var speed = Math.floor(Math.random() * maxSpeedEnemy + minSpeedEnemy);
    allEnemies.push(new Enemy(0, 65 + 80 * i, speed));
}
//console.log(speed);

var player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
