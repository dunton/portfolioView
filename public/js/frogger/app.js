/*
    Arcade Game Copy created by Ryan Dunton on September 20, 2016
    
*/

// Pass render and reset functions to Object.Prototypes
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Object.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
}
var score = 0;

// Create enemy objects to avoid
var Enemy = function(x, y) {

    // load bug image
    this.sprite = 'js/frogger/images/enemy-bug.png';
    // define location as x,y
    this.x = x;
    this.y = y; 
    // To get enemy speed, take Math.random which is a number > 0 < 1
    // multiply by 200 and add 100. This allows for variances in speeds
    this.speed = Math.floor((Math.random() * 200)+100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x <= 550){
        this.x += this.speed * dt;
    } else {
        this.x = -2;
    }
    // check for collisions, will reset player to 200, 400 upon collision
    if(player.x >= this.x - 30 && player.x <= this.x + 30){
        if(player.y >= this.y - 30 && player.y <= this.y +30){
            player.reset();
            console.log("Player collided with enemy");
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Define player and start point

var Player = function() {
    this.sprite = 'js/frogger/images/char-boy.png';
    this.x = 200;
    this.y = 400;
}

// Pass player instructions for each key press (ctlKey)
Player.prototype.update = function() {
    // Had user move in 50 increments because it makes it easier to
    // check if user is on screen in increments of 50 instead of 60,30 or other number

    // check if user has room to go left
    if(this.ctlKey === 'left' && this.x >0){
        this.x = this.x - 50;
        console.log("Player pressed left");
    }
    // check if user has room to go right
    else if (this.ctlKey === 'right' && this.x != 400){
        this.x = this.x + 50;
        console.log("Player pressed right");
    }
    else if (this.ctlKey === 'up'){
        this.y = this.y - 50;
        console.log("Player pressed up");
    }
    // check if user has room to go down
    else if (this.ctlKey === 'down' && this.y != 400){
        this.y = this.y + 50;
        console.log("Player pressed down");
    }
    // set ctlKey to nothing when not pressed
    this.ctlKey = null;
    // sends user back to start when reaching water
    if (this.y < 25){
        this.reset();
        console.log("Player reached water!");
        score += 1;
        var formattedScore = "<h1 id=\"scoreId\">%data%</h1>";
        formattedScore = formattedScore.replace("%data%", "Your current score is "+ score);
        $("#scoreId").remove();
        $(".score").append(formattedScore);
    }

}

// Allows Player to handle ctlKey as input
Player.prototype.handleInput = function(e){
    this.ctlKey = e;
};

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
(function placeEnemies(){
    allEnemies.push(new Enemy(-2, 60));
    allEnemies.push(new Enemy(-2, 100));
    allEnemies.push(new Enemy(-2, 150));
    allEnemies.push(new Enemy(-2, 220));
}());

var player =  new Player();

player.handleInput();


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

$("#scoreId").append("<h1> Your current score is: " + score +"</h1>");
