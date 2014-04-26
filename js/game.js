var WIDTH = 800, HEIGHT = 600;
var game = createBasicGame(WIDTH, HEIGHT, Phaser.CANVAS);

var slimy;
var music;

function preload() {
	game.load.spritesheet("slimy", "assets/stretched.png", 32, 32);
	loadAudio("music", "assets/music/test.ogg");
}

function create() {
	// Music
	// addMusic("music", music);
	// playMusic(music);

	// Adding Slimy to the world
	slimy = game.add.sprite(0, 0, "slimy");

	// Enabling Arcade Physics
	enableArcadePhysics(slimy);

	slimy.body.bounce.y = 0.2;
	slimy.body.gravity.y = 300;
	slimy.body.collideWorldBounds = true;

	enableInput(slimy);
	slimy.input.enableDrag(true);

	// Slimy Animation
	addAnimation(slimy, "blink", [0, 1], 2, true);
	animationStart(slimy, "blink");

	saveObject("slimy", slimy);
}

function update() {
	slimy.body.velocity.x = 0;
	
	if (keyIsDown(Phaser.Keyboard.A)) {
		slimy.body.velocity.x = -150;
	} else if (keyIsDown(Phaser.Keyboard.D)) {
		slimy.body.velocity.x = 150;
	}

	if (keyIsDown(Phaser.Keyboard.W) && ~~slimy.body.velocity.y == 0) {
		slimy.body.velocity.y = -350;
	}

	if (slimy.input.isDragged) {
		slimy.body.velocity.x = 0;
		slimy.body.velocity.y = 0;
	}
}