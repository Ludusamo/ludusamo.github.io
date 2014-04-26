// DEBUG
function log(msg) {
	console.log(msg);
}


// BASIC GAME FUNCTIONS
function createBasicGame(WIDTH, HEIGHT, type) {
	var game = new Phaser.Game(WIDTH, HEIGHT, type, '', {preload:preload, create:create, update:update});
	return game;
}

function createGroup(group) {
	group = game.add.group();
}

function loadImage(id, path) {
	game.load.image(id, path);
}

function loadSpritesheet(id, path, spriteWidth, spriteHeight) {
	game.load.spritesheet(id, path, spriteWidth, spriteHeight);
}

function loadAudio(id, path) {
	game.load.audio(id, path);
}


// SPRITES
function enableInput(sprite) {
	sprite.inputEnabled = true;
}

function disableInput(sprite) {
	sprite.inputEnabled = false;
}


// ARCADE PHYSICS
function enableArcadePhysics(sprite) {
	game.physics.arcade.enable(sprite);
}

function checkCollision(group1, group2) {
	game.physics.arcade.collide(group1, group2);
}

function checkOverlap(group1, group2, collideCallback, processCallback, callbackContext) {
	game.physics.arcade.overlap(group1, group2, collideCallback, processCallback, callbackContext); // DOUBLE CHECK THIS
}

function createArcadePhysicsGroup(group) {
	createGroup(group);
	group.enableBody = true;
}


// AUDIO
function addMusic(id, music) {
	music = game.add.audio(id);
}

function playMusic(music) {
	music.play();
}

function stopMusic(music) {
	music.pause();
}

function resumeMusic(music) {
	music.resume();
}


// ANIMATION
function addAnimation(sprite, id, frames, fps, loop) {
	sprite.animations.add(id, frames, fps, loop);
}

function animationStart(sprite, id) {
	sprite.animations.play(id);
}

function animationStop(sprite) {
	sprite.animations.stop();
}

function setFrame(sprite, frame) {
	sprite.frame = frame;
}


// INPUT
function keyIsDown(key) {
	return game.input.keyboard.isDown(key);
}


// Storage
function saveObject(id, object) {
	if (typeof(localStorage) == 'undefined' ) alert("Your Browser Does Not Support HTML5 Local.");
	else {
		try {
			localStorage.setItem(id, object);
		} catch (e) {
	 		if (e == QUOTA_EXCEEDED_ERR) alert('Quota exceeded!');
		}
	}
}

function deleteObject(id) {
	if (typeof(localStorage) == 'undefined' ) alert("Your Browser Does Not Support HTML5 Local.");
	else localStorage.removeItem(id);
}

function getObject(id) {
	if (typeof(localStorage) == 'undefined' ) alert("Your Browser Does Not Support HTML5 Local.");
	else return localStorage.getItem(id);
}