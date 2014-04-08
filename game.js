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

var numCircles = 10, circles = [];
for (var i = 0; i < numCircles; i++) 
	circles.push([Math.random() * width, Math.random() * height, Math.random() * 100, Math.random() / 2]);

var drawCircles = function() {
	for (var i = 0; i < numCircles; i++) {
	    ctx.fillStyle = 'rgba(255, 255, 255, ' + circles[i][3] + ')';
	    ctx.beginPath();
	    ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2, true);
	    ctx.closePath();
	    ctx.fill();
	}
};

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

var GameLoop = function() {
	clear();
	moveCircles(5);
	drawCircles();
	gLoop = setTimeout(GameLoop, 1000 / 50);
}

GameLoop();