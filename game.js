var width = 420, 
	height = 500, 
	gLoop,
	points = 0,
	state = true, 
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
	that.width = 64;
	that.height = 64;
	that.X = 0;
	that.Y = 0;

	// Animation
	that.frames = 1;
	that.currentFrame = 0;
	that.interval = 0;

	// Jumping and movement
	that.jumping = false;
	that.falling = false;
	that.velocityY;
	that.velocityX = 0;

	// Functions for physics and jumping
	that.jump = function() {
		if (!that.jumping && !that.falling) {
			that.velocityY = -17;
			that.jumping = true;
		}
	}
	that.checkJump = function() {
		if (that.Y > height * 0.4);
		else {
			if (that.jumpSpeed > 10) points++;
			moveCircles(5);
			platforms.forEach(function(platform, ind){
	            platform.Y -= that.velocityY;

	            if (platform.Y > height) {
	                var type = ~~(Math.random() * 5);
	                if (type == 0) 
	                    type = 1;
	                else 
	                    type = 0;
	                platforms[ind] = new Platform(Math.random() * (width - platformWidth), platform.Y - height, type);
	            }
      		});
		}
		that.velocityY++;
		if (that.velocityY == 0) {
			that.jumping = false;
			that.falling = true;
			that.velocityY = 1;
		}
	}
	that.checkFall = function() {
		if (that.Y < height - that.height) {
			that.velocityY++;
		} else {
			if (points == 0) 
				that.fallStop();
        	else 
            	GameOver();	
		}
	}
	that.fallStop = function() {
		that.falling = false;
		that.velocityY = 0;
		that.jump();
	}

	// Functions for moving
	that.moveLeft = function() {
		if (that.X > 0) that.velocityX = -5;
	}
	that.moveRight = function() {
		if (that.X + that.width < width) that.velocityX = 5;
	}
	that.move = function() {
		if (that.X + that.width + that.velocityX < width && that.X + that.velocityX > 0) {
			that.setPosition(that.X + that.velocityX, that.Y);
		}
		if (that.Y > height * 0.4) velocityY = 0;
		that.setPosition(that.X, that.Y + that.velocityY);
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

var Platform = function(x, y, type) {
	var that = this;
	that.firstColor = '#FF8C00';
	that.secondColor = '#EEEE00';
	that.onCollide = function(){
		player.fallStop();
	};
	if (type === 1) {
		that.firstColor = '#AADD00';
		that.secondColor = '#698B22';
		that.onCollide = function() {
			player.fallStop();
			player.jumpSpeed = 50;
		};
	}
	that.X = ~~x;
	that.Y = y;
	that.type = type;

	that.draw = function() {
		ctx.fillStyle = 'rgba(255, 255, 255, 1)';
		var gradient = ctx.createRadialGradient(that.X + (platformWidth/2), that.Y + (platformHeight/2), 5, that.X + (platformWidth/2), that.Y + (platformHeight/2), 45);
		gradient.addColorStop(0, that.firstColor);
		gradient.addColorStop(1, that.secondColor);
		ctx.fillStyle = gradient;
		ctx.fillRect(that.X, that.Y, platformWidth, platformHeight);
	};
	return that;
};

var numPlatforms = 7, platforms = [], platformWidth = 70, platformHeight = 20;
var generatePlatforms = function() {
	console.log("hi");
	var pos = 0, type;
	for (var i = 0; i < numPlatforms; i++) {
		type = ~~(Math.random() * 5);
		if (type == 0) type = 1;
		else type = 0;
		platforms[i] = new Platform(Math.random() * (width - platformWidth), pos, type);
		if (pos < height - platformHeight) pos += ~~(height / numPlatforms);
		console.log(i);
	}
}();

var checkCollision = function() {
	platforms.forEach(function(e, ind) {
		if (player.falling && 
			(player.X < e.X + platformWidth) && 
			(player.X + player.width > e.X) && 
			(player.Y + player.height > e.Y) && 
			(player.Y + player.height < e.Y + platformHeight))
				e.onCollide();
	})
}

var GameOver = function(){
    state = false;
//set state to false
    clearTimeout(gLoop);
//stop calling another frame
    setTimeout(function(){
//wait for already called frames to be drawn and then clear everything and render text
        clear(); 
        ctx.fillStyle = "Black";
        ctx.font = "10pt Arial";
        ctx.fillText("GAME OVER", width / 2 - 60, height / 2 - 50);
        ctx.fillText("YOUR RESULT:" + points, width / 2 - 60, height / 2 - 30);
    }, 100);
};

$(document).keydown(function(e) {
	var key = e.which;
	if(key == "37") player.moveLeft();
	else if(key == "39") player.moveRight();
})

var GameLoop = function() {
	clear();
	//moveCircles(5);
	drawCircles();
	platforms.forEach(function(platform) {
		platform.draw();
	});
	if (player.jumping) player.checkJump();
	if (player.falling) player.checkFall();
	player.move();
	
	checkCollision();
	player.draw();
	ctx.fillStyle = "Black";
	//change active color to black
	ctx.fillText("POINTS:" + points, 10, height-10);
	if (state) gLoop = setTimeout(GameLoop, 1000 / 50);
}
GameLoop();