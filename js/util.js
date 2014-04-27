// CONSTANTS
var W_KEY = Phaser.Keyboard.W;
var S_KEY = Phaser.Keyboard.S;
var A_KEY = Phaser.Keyboard.A;
var D_KEY = Phaser.Keyboard.D;
var J_KEY = Phaser.Keyboard.J;

// DEBUG
function log(msg) {
	console.log(msg);
}


// BASIC GAME FUNCTIONS
function createBasicGame(WIDTH, HEIGHT, type) {
	game = new Phaser.Game(WIDTH, HEIGHT, type, '', {preload:preload, create:create, update:update});
	return game;
}

function addState(id, state, startOnCreate) {
	game.state.add(id, state, startOnCreate);
}

function createGroup() {
	return game.add.group();
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

function loadTilemap(id, path, type) {
	game.load.tilemap(id, path, null, type);
}

function cameraFollow(sprite) {
	game.camera.follow(sprite);
}

function addImage(x, y, image) {
	return game.add.image(x, y, image);
}

function setTimedEvent(delay, callback, callbackContext) {
	game.time.events.loop(delay, callback, callbackContext);
}

function setBackgroundColor(color) {
	game.stage.backgroundColor = color;
}

function addButton(x, y, id, actionOnClick, overFrame, outFrame, downFrame) {
	return game.add.button(x, y, id, actionOnClick, this, overFrame, outFrame, downFrame);
}

function fadeIn(sprite, duration, ease, autoStart) {
	sprite.alpha = 0;
	game.add.tween(sprite).to({alpha:1}, duration, ease, autoStart);
}

function fadeOut(sprite, duration, ease, autoStart) {
	sprite.alpha = 1;
	game.add.tween(sprite).to({alpha:0}, duration, ease, autoStart);
}

function flash(sprite, duration, ease, autoStart) {
	sprite.alpha = 1;
	game.add.tween(sprite).to({alpha:0}, duration, ease, autoStart, 0, 1000, true);
}

function tileToCoord(x) {
	return x * 32;
}


// NPCS
function createNPC(npc, x, y, frame, msg, afterDialogFunction) {
	var buffer = addSprite(x, y, 'npc');
	buffer.dialog = msg;
	setFrame(buffer, frame);
	buffer.afterDialogFunction = afterDialogFunction;
	npc.add(buffer)
}


// SPRITES
function addSprite(x, y, id) {
	return game.add.sprite(x, y, id);
}

function enableInput(sprite) {
	sprite.inputEnabled = true;
}

function disableInput(sprite) {
	sprite.inputEnabled = false;
}


// TILEMAPS
function addTilemap(id) {
	map = game.add.tilemap(id);
}

function bindTiles(map, id, tiles) {
	map.addTilesetImage(id, tiles);
}

function setCollision(rng1, rng2) {
	map.setCollisionBetween(rng1, rng2);
}

function createLayer(name) {
	layer = map.createLayer(name);
}


// RETROFONTS
function addFont(id, width, height, textset, charPerRow) {
	return game.add.retroFont(id, width, height, textset, charPerRow);
}

function setText(font, text) {
	font.text = text;
}


// ARCADE PHYSICS
function startArcadePhysics() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
}

function enableArcadePhysics(sprite) {
	game.physics.arcade.enable(sprite);
}

function checkCollision(group1, group2) {
	game.physics.arcade.collide(group1, group2);
}

function checkCollision(group1, group2, functionToDo) {
	game.physics.arcade.collide(group1, group2, functionToDo, null, this);
}

function checkOverlap(group1, group2, collideCallback, processCallback, callbackContext) {
	game.physics.arcade.overlap(group1, group2, collideCallback, processCallback, callbackContext); // DOUBLE CHECK THIS
}

function createArcadePhysicsGroup(group) {
	createGroup(group);
	group.enableBody = true;
}

function setVelocityX(sprite, x) {
	sprite.body.velocity.x = x;
}

function setVelocityY(sprite, y) {
	sprite.body.velocity.y = y;
}

function setVelocity(sprite, x, y) {
	setVelocityX(sprite, x);
	setVelocityY(sprite, y);
}

function setAccelerationX(sprite, x) {
	sprite.body.acceleration.x = x;
}

function setAccelerationY(sprite, y) {
	sprite.body.acceleration.y = y;
}

function setAcceleration(sprite, x, y) {
	setAccelerationX(sprite, x);
	setAccelerationY(sprite, y);
}



// AUDIO
function addMusic(id) {
	return game.add.audio(id, 1, true);
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