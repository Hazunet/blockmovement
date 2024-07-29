"use strict";

let keys = {
  "w" : 87,
  "a" : 65,
  "s" : 83,
  "d" : 68,
  "up_arrow" : 38,
  "left_arrow" : 37,
  "down_arrow" : 40,
  "right_arrow" : 39,
  "space" : 32,
}

class Thing {
  constructor(x, y, width, height, shape, colour, speed_x, speed_y) {
    // Position
    this.x = x;
    this.y = y;
    // Look
    this.width = width;
    this.height = height;
    this.shape = shape;
    this.colour = colour;
    // Speed
    this.speed_x = speed_x;
    this.speed_y = speed_y;
    // Direction
    this.direction = "";
  }

  draw() {
    change_colour(this.colour[0], this.colour[1], this.colour[2]);

    if (this.shape === "ellipse") {
      ellipse(this.x, this.y, this.width, this.height);
    } else if (this.shape === "rectangle") {
      rect(this.x, this.y, this.width, this.height);
    }

    revert_colour();
  }
}

class Player extends Thing {
  constructor(x, y, width, height, shape, colour, speed_x, speed_y) {
    super(x, y, width, height, shape, colour, speed_x, speed_y);
  }

  move() {
    // W / up arrow
    if (keyIsDown(keys["w"]) === true || keyIsDown(keys["up_arrow"]) === true) {
      this.y -= this.speed_y;
      this.direction = "up";
    }
    // A / left arrow
    if (keyIsDown(keys["a"]) === true || keyIsDown(keys["left_arrow"]) === true) {
      this.x -= this.speed_x;
      this.direction = "left";
    }
    // S / down arrow
    if (keyIsDown(keys["s"]) === true || keyIsDown(keys["down_arrow"]) === true) {
      this.y += this.speed_y;
      this.direction = "down";
    }
    // D / right arrow
    if (keyIsDown(keys["d"]) === true || keyIsDown(keys["right_arrow"]) === true) {
      this.x += this.speed_x;
      this.direction = "right";
    }
  }

  shoot() {
    // Add if mouse clicked ?
    if (keyIsDown(keys["space"]) === true) {
      console.log("space pressed");
      bullet = new Bullet(this.x, this.y, 5,5, "rectange", [0, 0, 255], 3, 3, this.direction);
      bullets.push(bullet);
    }
  }
}
class Bullet extends Thing {
  constructor(x, y, width, height, shape, colour, speed_x, speed_y, direction) {
    //albert love justin <33
    // Urm actually... it's "Albert love Justing <3"
    
    super(x, y, width, height, shape, colour, speed_x, speed_y);

    // Direction
    this.direction = direction
  }

  move() {
    if (direction === "left") {
      this.x -= this.speed_x;
    }
    else if (direction === "right") {
      this.x += this.speed_x;
    }
    else if (direction === "up") {
      this.y -= this.speed_y;
    }
    else if (direction === "down") {
      this.y += this.speed_y;
    }
  }
}

class Enemy extends Thing {
  constructor(x, y, width, height, shape, colour, speed_x, speed_y) {
    super(x, y, width, height, shape, colour, speed_x, speed_y);
  }

  move(player_x, player_y) {
    // If enemy is to the left of you
    // Enemy goes right
    if (this.x < player_x) {
      this.x += this.speed_x;
      this.direction = "right";
    }
    // If enemy is to the right of you
    // Enemy goes left
    if (this.x > player_x) {
      this.x -= this.speed_x;
      this.direction = "left";
    }
    // If enemy is above you
    // Enemy goes down
    if (this.y < player_y) {
      this.y += this.speed_y;
      this.direction = "down";
    }
    // If enemy is below you
    // Enemy goes up
    if (this.y > player_y) {
      this.y -= this.speed_y;
      this.direction = "up";
    }
  }
}

let player;
let enemy;
let bullets = [];
let bullet;

function setup() {
  var canvas_width = windowWidth;
  var canvas_height = windowHeight;
  var background_colour = color(0, 255, 0);

  createCanvas(canvas_width, canvas_height);
  background(background_colour);

  player = new Player(100, 100, 40, 40, "rectangle", [255, 255, 255], 4, 4);
  enemy = new Enemy(150, 150, 40, 40, "rectangle", [255, 0, 0], 2, 2);
}

// Parmeter can be a tuple ( ex: (r, g, b) )
function change_colour(r, g, b) {
  fill(r, g, b);
}

function revert_colour() {
  noFill();
}

function draw() {
  background(0);

  // Player
  player.move();
  player.draw();
  player.shoot();

  for (let i=0; i<bullets.length; i++){
    bullets[i].move();
    bullets[i].draw(); 
  }

  // Enemy
  enemy.move(player.x, player.y);
  enemy.draw();
  // console.log(enemy.x, enemy.y);
  // console.log(player.x, player.y);
}