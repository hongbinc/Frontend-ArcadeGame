/**
 * @fileoverview Classes for the arcade game logic. 
 * @author Hongbin Chen
 */
/**
 * Enemy Class
 * Constructs an enemy in the game.
 */
var Enemy = function (initX, initY, speed) {
    // Enemy's position and speed
    this.x = initX;
    this.y = initY;
    this.speed = speed;
    // Load enemy's image
    this.sprite = 'images/enemy-bug.png';
};
/**
 * Update the enemy's position
 * @param dt A time delta between ticks
 */
Enemy.prototype.update = function (dt) {
    // Make the enemies move.
    this.x = this.x + this.speed * dt;
    // If our enemies move off the screen, restart them at one block
    // right before the start of the screen.
    if (this.x > 500) {
        this.x = 0;
        // Randomnize enemy's speed every time enemy move off 
        // the screen and start from the begining again.
        this.randamSpeed();
    }
    // Check if there are collisions between the player and enemies.
    if (Math.abs(player.x - this.x) < 50 && Math.abs(player.y - this.y) < 50) {
        // If player is hit, reset player position.
        player.reset();
    }
};
/**
 * Renders and draws the enemy on the screen.
 * @return {void}
 */
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/**
 * Randomnize enemy's speed every time enemy move off 
 * the screen and start from the begining again.
 */
Enemy.prototype.randamSpeed = function () {
    var speedRandom = Math.floor(Math.random() * maxSpeedEnemy + minSpeedEnemy);
    this.speed = speedRandom;
};
/**
 * Player class.
 * Constructs a player.
 * @constructor
 */
var Player = function (PlayerX, PlayerY) {
    this.x = PlayerX;
    this.y = PlayerY;
    this.sprite = 'images/char-horn-girl.png';
};
/**
 * Update player's position.
 * @return {void}
 */
Player.prototype.update = function () {
    // If player reach the water, reset player's position
    if (this.y < 0) {
        player.reset();
    }
};
/**
 * Renders and draws a player in the game.
 * @return {void}
 */
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/**
 * Handles keyboard pressed events.
 * @param {string} key The id of pressed key
 * @return {void}
 */
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
    }
};

/**
 * Reset player's position.
 * @return {void}
 */
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};
var allEnemies = [],
    maxSpeedEnemy = 300,
    minSpeedEnemy = 110;
// Initializes enimies and add them to the allEnemies[].
for (var i = 0; i < 4; i++) {
    // Randomnize enemy's speed
    var speed = Math.floor(Math.random() * maxSpeedEnemy + minSpeedEnemy);
    // Initialize each enemy's position
    allEnemies.push(new Enemy(0, 65 + 80 * i, speed));
}
// Initialize a new player with x and y position.
var player = new Player(200, 400);

/**
 * Listens for key presses and sends the keys to your
 * Player.handleInput() method.
 */
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});