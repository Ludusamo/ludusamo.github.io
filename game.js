var width = 320, 
	height = 500, 
	gLoop, 
	c = document.getElementById('c'),
	ctx = c.getContext('2d');

	c.width = width;
	c.height = height;

// clear canvas function
var clear = function() {
	ctx.fillStyle = '#d0e7f9';
	ctx.clearRect(0, 0, width, height);
	ctx.beginPath();
	ctx.rect(0, 0, width, height);
	ctx.closePath();
	ctx.fill();
}

// Initializes the Circles or "Clouds"
var numCircles = 10, circles = [];
for (var i = 0; i < numCircles; i++) 
	circles.push([Math.random() * width, Math.random() * height, Math.random() * 100, Math.random() / 2]);

// Function to draw the circles
var drawCircles = function() {
	for (var i = 0; i < numCircles; i++) {
	    ctx.fillStyle = 'rgba(255, 255, 255, ' + circles[i][3] + ')';
	    ctx.beginPath();
	    ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2, true);
	    ctx.closePath();
	    ctx.fill();
	}
};

// Function to move the clouds vertically
var moveCircles = function(e) {
  for (var i = 0; i < numCircles; i++) {
    if (circles[i][1] - circles[i][2] > height) {
      circles[i][0] = Math.random() * width;
      circles[i][2] = Math.random() * 100;
      circles[i][1] = 0 - circles[i][2];
      circles[i][3] = Math.random() / 2;
    } else {
      circles[i][1] += e;
    }
  }
};

// Player function (This method of creating an object is not reusable, it is used immediately as soon as it is defined.)
var player = new (function() {
	var that = this;
	that.image = new Image();
	that.image.src = "img/stretched.png"

	// Position and Size
	that.width = 32;
	that.height = 32;
	that.X = 0;
	that.Y = 0;

	// Animation
	that.frames = 1;
	that.currentFrame = 0;
	that.interval = 0;

	// Jumping
	that.jumping = false;
	that.falling = false;
	that.jumpSpeed = 0;
	that.fallSpeed = 0;

	// Functions for physics and jumping
	that.jump = function() {
		if (!that.jumping && !that.falling) {
			that.fallSpeed = 0;
			that.jumpSpeed = 17;
			that.jumping = true;
		}
	}
	that.checkJump = function() {
		that.setPosition(that.X, that.Y - that.jumpSpeed);
		that.jumpSpeed--;
		if (that.jumpSpeed == 0) {
			that.jumping = false;
			that.falling = true;
			that.fallSpeed = 1;
		}
	}
	that.checkFall = function() {
		if (that.Y < height - that.height) {
			that.setPosition(that.X, that.Y + that.fallSpeed);
			that.fallSpeed++;
		} else {
			that.fallStop();
		}
	}
	that.fallStop = function() {
		that.falling = false;
		that.fallSpeed = 0;
		that.jump();
	}

	// Functions for the player
	that.setPosition = function(x, y){
    	that.X = x;
    	that.Y = y;
	}
    that.draw = function(){
        try {
            ctx.drawImage(that.image, 0, 32 * that.currentFrame, 32, 32, that.X, that.Y, that.width, that.height);
        } catch (e) {}

        if (that.interval % 10 == 0) that.currentFrame = 1;
        if ((that.interval % 7 == 0) && (that.interval % 13 == 0)) {
	        that.currentFrame = 0;
            if (that.interval = 100) that.interval = 0;
        }
    	that.interval++;  
    }

})();

player.setPosition(~~((width-player.width)/2), ~~((height - player.height)/2));
// "~~" means nearest lower integer
player.jump();

var GameLoop = function() {
	clear();
	moveCircles(5);
	drawCircles();
	if (player.jumping) player.checkJump();
	if (player.falling) player.checkFall();
	player.draw();
	gLoop = setTimeout(GameLoop, 1000 / 50);
}

GameLoop();