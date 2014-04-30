var highscore;

var map;
var tileset;
var layer;

var player;
var opponent;
var clouds;
var npc;

var gui;
var pauseButton;

var paused = false, inConvo = false, delay = true;
var pauseMenu;

var jIndicator;
var pausedFont, jFont, dialogFont, storyFont;
var chatText, text;
var chatBox;
var story = new Array(), storyCount = -1;

var velocity = 100;

var music;

function spawnCloud() {
	var cloud = clouds.getFirstDead();
	if (cloud) {
		cloud.body.allowGravity = false;
		cloud.reset(0, game.world.randomY - 200);
		cloud.scale.setTo(2, 2);

        cloud.frame = game.rnd.integerInRange(0, 4);
	}
}

function pause() {
	game.state.pause();
	paused = true;

	pauseMenu.forEach(function(item) {
		item.visible = true;
	});
}

function resume() {
	game.state.resume();
	paused = false;

	pauseMenu.forEach(function(item) {
		item.visible = false;
	});
}

function resumeModified() {
	resume();
	createJunk.resume();
}

function loadPauseMenu() {
	pauseMenu = createGroup();
	var resumeB = addButton((WIDTH / 2) - (128 / 2), 100, 'buttons', resume, 6, 5, 7);
	resumeB.scale.setTo(4, 4);
	resumeB.smoothed = false;
	pauseMenu.add(resumeB);

	setText(pausedFont, 'PAUSED');
	var text = addImage(0, 20, pausedFont);
	text.x += (WIDTH / 2) - 200;
	text.scale.setTo(4, 4);
	text.smoothed = false;
	pauseMenu.add(text);

	pauseMenu.forEach(function(item) {
		item.visible = false;
		item.fixedToCamera = true;
	});
}

function loadModifiedPause() {
	pauseMenu = createGroup();
	var resumeB = addButton((WIDTH / 2) - (128 / 2), 100, 'buttons', resumeModified, 6, 5, 7);
	resumeB.scale.setTo(4, 4);
	resumeB.smoothed = false;
	pauseMenu.add(resumeB);

	setText(pausedFont, 'PAUSED');
	var text = addImage(0, 20, pausedFont);
	text.x += (WIDTH / 2) - 200;
	text.scale.setTo(4, 4);
	text.smoothed = false;
	pauseMenu.add(text);

	pauseMenu.forEach(function(item) {
		item.visible = false;
		item.fixedToCamera = true;
	});
}

function dialog(player, npc) {
	jIndicator.visible = true;
	jIndicator.x = npc.x + 8;
	jIndicator.y = npc.y - 20;

	if (keyIsDown(J_KEY)) {
		engageDialog(npc);
		inConvo = true;
	}
}

function engageDialog(npc) {
	setText(dialogFont, npc.dialog);
	chatText = addImage(chatBox.x + 20, chatBox.y + 20, dialogFont);
	chatText.visible = true;
	chatBox.visible = true;
	jIndicator.x = 800 - 20;
	jIndicator.y = 600 - 20;
	jIndicator.fixedToCamera = true;
	jIndicator.bringToTop();

	delay = false;
	game.time.events.add(1000, function(){delay = true;}, this);
}

function leaveDialog(player, npc) {
	jIndicator.x = npc.x + 8;
	jIndicator.y = npc.y - 20;
	jIndicator.fixedToCamera = false;
	chatBox.visible = false;
	chatText.visible = false;
	inConvo = false;
	npc.afterDialogFunction();

	delay = false;
	game.time.events.add(1000, function(){delay = true;}, this);
}

function advanceStory() {
	storyCount++;
	setText(storyFont, story[storyCount]);
}

emptyFunction = function() {}





















MainMenu = function(game) {
	this.game = game;
};

MainMenu.prototype = {
	preload: function() {
		loadTilemap('opening', 'assets/imgs/tilemap/opening_map.json', Phaser.Tilemap.TILED_JSON);
		loadTilemap('arena', 'assets/imgs/tilemap/arena.json', Phaser.Tilemap.TILED_JSON);
		loadTilemap('town', 'assets/imgs/tilemap/town.json', Phaser.Tilemap.TILED_JSON);
		loadImage('Tileset_A', 'assets/imgs/tiles/Tileset_A.png');
		loadImage('Font_A', 'assets/imgs/fonts/Font_A.png');
		loadImage('chat_box', 'assets/imgs/gui/chat_box.png');
		loadSpritesheet('player', 'assets/imgs/spritesheets/player.png', 32, 32);
		loadSpritesheet('cloud', 'assets/imgs/spritesheets/clouds.png', 32, 32);
		loadSpritesheet('npc', 'assets/imgs/spritesheets/npc.png', 32, 32);
		loadSpritesheet('buttons', 'assets/imgs/spritesheets/buttons.png', 32, 32);
		loadSpritesheet('underground', 'assets/imgs/spritesheets/underground.png', 32, 32);
		loadAudio('town', 'assets/music/orange_cat.ogg');
		loadAudio('battle', 'assets/music/weak_goat.ogg');
	},

	create: function() {
		music = addMusic('town');
		playMusic(music);

		// Physics
		startArcadePhysics();
		game.physics.arcade.gravity.y = 300;
		
		// Maps
		addTilemap('opening');
		bindTiles(map, 'Tileset_A', 'Tileset_A');
		setCollision(1, 2);
		setCollision(4, 4);
		layer = map.createLayer('layer');
		layer.resizeWorld();

		// Player
		player = addSprite(tileToCoord(0), tileToCoord(16), 'player');
		addAnimation(player, 'walkingLeft', [5, 6, 7, 8], 15, true);
		addAnimation(player, 'walkingRight', [0, 1, 2, 3], 15, true);
		enableArcadePhysics(player);
		player.body.collideWorldBounds = true;

		// Font
		jFont = addFont('Font_A', 16, 16, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 18);
		pausedFont = addFont('Font_A', 16, 16, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 18);
		dialogFont = addFont('Font_A', 16, 16, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 18);
		storyFont = addFont('Font_A', 16, 16, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 18);

		// NPC
		npc = createGroup();
		createNPC(npc, tileToCoord(39), tileToCoord(16), 1, 'Go Forth Claim The Crown', function() {game.state.start('town'); game.camera.reset();});
		npc.forEach(function(item) {
			enableArcadePhysics(item);
		});
		setText(jFont, 'J');
		jIndicator = addImage(npc.x, npc.y - 20, jFont);
		jIndicator.visible = false;
		jIndicator.smoothed = false;
		flash(jIndicator, 1000, Phaser.Easing.Linear.None, true);

		// Camera
		cameraFollow(player);
		fadeIn(player, 2000, Phaser.Easing.Linear.None, true);
		fadeIn(layer, 2000, Phaser.Easing.Linear.None, true);

		// Story
		story[0] = 'No one ever paid much attention,';
		story[1] = 'to the young guy who walked in town,';
		story[2] = 'what they did not know,';
		story[3] = 'was that this young guy was about to blow,';
		story[4] = 'He had been shunned,';
		story[5] = 'His father murdered,';
		story[6] = 'Something inside him stirred,';
		story[7] = 'To rise to power,';
		story[8] = 'To avenge his father,';
		story[9] = 'To win the kings duel.';
		story[10] = 'All come to the king’s arena,';
		story[11] = 'Shouts the crier';
		story[12] = 'Leave thine pitiful lives,';
		story[13] = 'fight for honor and glory,';
		story[14] = 'and take the crown.';
		story[15] = 'They all laughed,';
		story[16] = 'at his declaration to fight,';
		story[17] = 'but did not stop him as it was his right,';
		story[18] = 'However,';
		story[19] = 'What they did not know,';
		story[20] = 'About this young guy who was about to blow,';
		story[21] = 'That as he went unnoticed,';
		story[22] = 'He had a special skill,';
		story[23] = 'That was about to give the crowd quite a thrill.';
		story[24] = 'Talk to the Man in Blue To Begin';

		setTimedEvent(3000, advanceStory, storyCount < 23);
		text = addImage(50, 100, storyFont);
		text.fixedToCamera = true;

		// Gui
		loadPauseMenu();	

		gui = createGroup();
		
		pauseButton = addButton(10, 10, 'buttons', pause, 1, 0, 2);
		
		chatBox = addSprite(0, 400, 'chat_box');
		chatBox.scale.setTo(2, 2);
		chatBox.visible = false;

		gui.add(pauseButton);
		gui.add(chatBox);
		gui.forEach(function(item) {
			item.fixedToCamera = true;
		});
	},

	update: function() {
		checkCollision(player, layer);
		checkCollision(npc, layer);

		if (!inConvo && delay) {
			jIndicator.visible = false;
			checkOverlap(player, npc, dialog, null, this);	
		} else if (keyIsDown(J_KEY) && delay) {
			checkOverlap(player, npc, leaveDialog, null, this);
		}

		if (!paused && !inConvo) {
			setVelocityX(player, 0);

			if (keyIsDown(A_KEY)) {
				setVelocityX(player, -(velocity));
				animationStart(player, 'walkingLeft');
			}
			if (keyIsDown(D_KEY)) {
				setVelocityX(player, velocity);
				animationStart(player, 'walkingRight');
			}
			if (keyIsDown(W_KEY) && player.body.onFloor()) {
				setVelocityY(player, -200);
			}
			if (player.body.velocity.x == 0) {
				animationStop(player);
				setFrame(player, 4);
			}
		} 
	},

	shutdown: function() {
		fadeOut(player, 2000, Phaser.Easing.Linear.None, true);
		fadeOut(layer, 2000, Phaser.Easing.Linear.None, true);
		music.stop();
	},

	paused: function() {
		setVelocity(player, 0, 0);
		npc.forEach(function(item) {
			setVelocity(item, 0, 0);
		});	
	}
}































function confirmDialog() {
	setText(dialogFont, 'Yes or No');
	chatText = addImage(chatBox.x + 20, chatBox.y + 20, dialogFont);
	chatText.visible = true;
	chatBox.visible = true;
	inConvo = true;
	var yButton = addButton(chatBox.x + 20, chatBox.y + 100, 'buttons', function() {
		game.state.start('arena'); 
		game.camera.reset();
		chatText.visible = false;
		chatBox.visible = false;
		yButton.visible = false;
		xButton.visible = false;
		inConvo = false;
	}, 11, 10, 12);
	var xButton = addButton(chatBox.x + 100, chatBox.y + 100, 'buttons', function() {
		chatText.visible = false;
		chatBox.visible = false;
		yButton.visible = false;
		xButton.visible = false;
		inConvo = false
	}, 16, 15, 17);
}


Town = function(game) {
	this.game = game;
};

Town.prototype = {
	create: function() {
		music = addMusic('town');
		playMusic(music);

		delay = true;
		// Physics
		startArcadePhysics();
		game.physics.arcade.gravity.y = 300;

		// Tilemap
		addTilemap('town');
		bindTiles(map, 'Tileset_A', 'Tileset_A');
		setCollision(1, 2);
		setCollision(4, 4);
		layer = map.createLayer('layer');
		layer.resizeWorld();

		// Player
		player = addSprite(tileToCoord(0), tileToCoord(16), 'player');
		addAnimation(player, 'walkingLeft', [5, 6, 7, 8], 15, true);
		addAnimation(player, 'walkingRight', [0, 1, 2, 3], 15, true);
		enableArcadePhysics(player);
		player.body.collideWorldBounds = true;

		// Clouds
		clouds = createGroup();
		clouds.createMultiple(20, 'cloud', 0, false);
		enableArcadePhysics(clouds);
		setTimedEvent(2000, spawnCloud, clouds.countDead() > 0);

		// Font
		jFont = addFont('Font_A', 16, 16, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 18);
		pausedFont = addFont('Font_A', 16, 16, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 18);
		dialogFont = addFont('Font_A', 16, 16, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 18);

		// NPC
		npc = createGroup();
		createNPC(npc, tileToCoord(25), tileToCoord(16), 5, 'Are you ready to enter the arena', confirmDialog);
		createNPC(npc, tileToCoord(12), tileToCoord(16), 6, 'So you are the boy that can use mana', emptyFunction);
		createNPC(npc, tileToCoord(21), tileToCoord(16), 7, 'Is it true you gather mana from underground', emptyFunction);
		npc.forEach(function(item) {
			enableArcadePhysics(item);
		});
		setText(jFont, 'J');
		jIndicator = addImage(npc.x, npc.y - 20, jFont);
		jIndicator.visible = false;
		jIndicator.smoothed = false;
		flash(jIndicator, 1000, Phaser.Easing.Linear.None, true);

		// Camera
		cameraFollow(player);
		fadeIn(player, 2000, Phaser.Easing.Linear.None, true);
		fadeIn(layer, 2000, Phaser.Easing.Linear.None, true);

		// Gui
		loadPauseMenu();	

		gui = createGroup();
		
		pauseButton = addButton(10, 10, 'buttons', pause, 1, 0, 2);
		
		chatBox = addSprite(0, 400, 'chat_box');
		chatBox.scale.setTo(2, 2);
		chatBox.visible = false;

		gui.add(pauseButton);
		gui.add(chatBox);
		gui.forEach(function(item) {
			item.fixedToCamera = true;
		});
	},

	update: function() {
		clouds.forEach(function(item) {
			if (item.exists && item.body.x > game.world.width) {
				item.kill();
			}
			setVelocity(item, 25, 0);
		});

		setVelocityX(player, 0);
		checkCollision(player, layer);
		checkCollision(npc, layer);

		if (!inConvo && delay) {
			jIndicator.visible = false;
			checkOverlap(player, npc, dialog, null, this);	
		} else if (keyIsDown(J_KEY) && delay) {
			checkOverlap(player, npc, leaveDialog, null, this);
		}

		if (!paused && !inConvo) {
			setVelocityX(player, 0);

			if (keyIsDown(A_KEY)) {
				setVelocityX(player, -(velocity));
				animationStart(player, 'walkingLeft');
			}
			if (keyIsDown(D_KEY)) {
				setVelocityX(player, velocity);
				animationStart(player, 'walkingRight');
			}
			if (keyIsDown(W_KEY) && player.body.onFloor()) {
				setVelocityY(player, -200);
			}
			if (player.body.velocity.x == 0) {
				animationStop(player);
				setFrame(player, 4);
			}
		} 
	},

	shutdown: function() {
		fadeOut(player, 2000, Phaser.Easing.Linear.None, true);
		fadeOut(layer, 2000, Phaser.Easing.Linear.None, true);
		music.stop();
	},

	paused: function() {
		setVelocity(player, 0, 0);
		npc.forEach(function(item) {
			setVelocity(item, 0, 0);
		});
		
		clouds.forEach(function(item) {
			setVelocity(item, 0, 0);
		});
	}
}

























































var stateFont;
var currentState = 0; // 0 for fight begin
					  // 1 for mana collection
					  // 2 for attack
					  // 3 for enemy
var friends;
var foes;
var enemy;

var collector;
var undergroundStuff;
var createJunk;

var statFont;
var statText;
var enemyStatFont;
var enemyStatText;

var continueButton;
var attack;
var familiar;

var scoreFont, scoreText;
var score = 0;

var attacking = false;

function continueDialog() {
	if (score > highscore) {
		highscore = score;
		saveObject('highscore', highscore);
	}
	setText(dialogFont, 'You Lose ' + score);
	chatText = addImage(chatBox.x + 20, chatBox.y + 20, dialogFont);
	chatText.visible = true;
	chatBox.visible = true;
	inConvo = true;
	var yButton = addButton(chatBox.x + 20, chatBox.y + 100, 'buttons', function() {
		game.state.start('town'); 
		game.camera.reset();
		chatText.visible = false;
		chatBox.visible = false;
		yButton.visible = false;
		inConvo = false;
	}, 11, 10, 12);
}

function makeJunk() {
	var junk = addSprite(tileToCoord(23), tileToCoord(game.rnd.integerInRange(11, 17)), 'underground');
	junk.frame = game.rnd.integerInRange(1, 2);
	enableArcadePhysics(junk);
	junk.body.allowGravity = false;

	undergroundStuff.add(junk);
}

function summonFamiliar() {
	if (familiar.isDead && player.mana >= 75 && !attack.exists) {
		familiar = addSprite(tileToCoord(5), tileToCoord(0), 'npc');
		familiar.frame = 4;
		familiar.health = (enemy.atk * 2) + (enemy.atk / 2);
		enableArcadePhysics(familiar);
		familiar.isDead = false;
		friends.add(familiar);
		score += 200;
	}
}

function useAttack() {
	if (player.mana >= 20 && !attack.exists) {
		player.mana -= 20;
		player.atk++;
		score += 100;
	}
}

function useMagic() {
	if (player.mana >= 10) {
		attack = addSprite(tileToCoord(3), tileToCoord(7), 'npc');
		attack.frame = 3;
		enableArcadePhysics(attack);
		attack.body.velocity.x = 400;
		attack.body.allowGravity = false;
		score += 50;
		player.mana -= 10;
	}	
}

function stats() {
	setText(statFont, 'HP: ' + player.health + ' ' + 'ATK: ' + player.atk + ' ' + 'Mana: ' + player.mana);
	statText = addImage(tileToCoord(0) + 16, tileToCoord(10) + 8, statFont);
}

function enemyStats() {
	setText(enemyStatFont, 'HP: ' + enemy.health + ' ' + 'ATK: ' + enemy.atk);
	enemyStatText = addImage(tileToCoord(19) + 16, tileToCoord(10) + 8, enemyStatFont);
}

function reachedEnd(stuff, layer) {
	stuff.kill();
}

function collect(collector, stuff) {
	if (stuff.frame == 1) {
		player.mana++;
		stuff.kill();
		score += 10;
	} else {
		startAttackState();
	}
}

function startCollectionState() {
	log("hi");
	currentState = 1;
	game.time.events.add(2000, function() {
		text.visible = false;
		createJunk.resume();
	}, this);
}

function startAttackState() {
	currentState = 2;
	undergroundStuff.forEach(function(item) {
		item.kill();
	});
	log("attack");
	setText(stateFont, 'Attack Phase');
	text = addImage(0, 0, stateFont);
	text.scale.setTo(2, 2);
	text.x = (800/ 2) - (text.width / 2);
	text.y = 200;
	text.visible = true;
	collector.x = tileToCoord(1);
	collector.y = tileToCoord(14);
	createJunk.pause();
	continueButton.visible = true;

	game.time.events.add(2000, function() {
		text.visible = false;
	}, this);
}

function startEnemyState() {
	if (!attack.exists) {
		attackPlayer();
		continueButton.visible = false;
		currentState = 3;

		game.time.events.add(2000, function() {
			startCollectionState();
			setText(stateFont, 'Fight Begin');
			text = addImage(0, 0, stateFont);
			text.scale.setTo(2, 2);
			text.x = (800/ 2) - (text.width / 2);
			text.y = 200;
		}, this);
	}
}

function spawnEnemy(health, atk) {
	enemy = addSprite(tileToCoord(22), tileToCoord(5), 'npc');
	enemy.frame = 0;
	enemy.health = health;
	enemy.atk = atk;
	enableArcadePhysics(enemy);
	foes.add(enemy);
	player.health += 1;
	continueButton.visible = false;
	game.time.events.add(2000, function() {
		startCollectionState();
		setText(stateFont, 'Fight Begin');
		text.visible = true;
		text.scale.setTo(2, 2);
		text.x = (800/ 2) - (text.width / 2);
		text.y = 200;
	}, this);currentState = 0;
}

function attackPlayer() {
	var x = 2;
	if (!familiar.isDead) x = 5;
	attack = addSprite(tileToCoord(x), tileToCoord(0), 'npc');
	attack.frame = 2;
	enableArcadePhysics(attack);
}

function updateScore() {
	setText(scoreFont, 'Score: ' + score);
	scoreText = addImage(tileToCoord(20), tileToCoord(0), scoreFont);
}

Arena = function(game) {
	this.game = game;
};

Arena.prototype = {
	create: function() {
		music = addMusic('battle');
		playMusic(music);
		familiar = addSprite(tileToCoord(5), tileToCoord(0), 'npc');
		familiar.isDead = true;
		familiar.kill();

		startArcadePhysics();
		game.physics.arcade.gravity.y = 300;
		addTilemap('arena');
		bindTiles(map, 'Tileset_A', 'Tileset_A');

		setCollision(1, 2);
		layer = map.createLayer('layer');
		layer.resizeWorld();	

		collector = addSprite(tileToCoord(1), tileToCoord(14), 'underground');
		enableArcadePhysics(collector);
		collector.body.allowGravity = false;
		collector.frame = 0;
		collector.constVelocity = 200;

		friends = createGroup();
		foes = createGroup();
		undergroundStuff = createGroup();

		// Player
		player = addSprite(tileToCoord(2), tileToCoord(7), 'player');
		addAnimation(player, 'walkingLeft', [5, 6, 7, 8], 15, true);
		addAnimation(player, 'walkingRight', [0, 1, 2, 3], 15, true);
		enableArcadePhysics(player);
		player.body.collideWorldBounds = true;
		friends.add(player);

		player.health = 3;
		player.atk = 1;
		player.mana = 0;

		fadeIn(player, 2000, Phaser.Easing.Linear.None, true);
		fadeIn(layer, 2000, Phaser.Easing.Linear.None, true);

		// Gui
		loadModifiedPause();	

		gui = createGroup();
		
		pauseButton = addButton(10, 10, 'buttons', pause, 1, 0, 2);
		continueButton = addButton(tileToCoord(14), tileToCoord(10), 'buttons', startEnemyState, 6, 5, 7);
		continueButton.visible = false;

		var summonFamiliarB = addButton(tileToCoord(11), tileToCoord(10), 'buttons', summonFamiliar, 21, 20, 22);
		var attackB = addButton(tileToCoord(12), tileToCoord(10), 'buttons', useAttack, 26, 25, 27);
		var magicB = addButton(tileToCoord(13), tileToCoord(10), 'buttons', useMagic, 31, 30, 32);

		chatBox = addSprite(0, 400, 'chat_box');
		chatBox.scale.setTo(2, 2);
		chatBox.visible = false;

		stateFont = addFont('Font_A', 16, 16, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 18);
		statFont = addFont('Font_A', 16, 16, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 18);
		enemyStatFont = addFont('Font_A', 16, 16, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 18);
		setText(stateFont, 'Fight Begin');
		text = addImage(0, 0, stateFont);
		text.scale.setTo(2, 2);
		text.x = (800/ 2) - (text.width / 2);
		text.y = 200;

		scoreFont = addFont('Font_A', 16, 16, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 18);

		gui.add(pauseButton);
		gui.add(chatBox);
		gui.add(text);
		gui.add(summonFamiliarB);
		gui.add(attackB);
		gui.add(magicB);
		gui.forEach(function(item) {
			item.fixedToCamera = true;
			item.smoothed = false;
		});

		spawnEnemy(1, 1);
		stats();
		enemyStats();
		updateScore();

		createJunk = game.time.create(false);
		createJunk.loop(300, makeJunk, this);
		createJunk.start();
		createJunk.pause();
	},

	update: function() {
		checkCollision(friends, layer);
		checkCollision(foes, layer);
		checkCollision(collector, layer);
		checkCollision(undergroundStuff, layer, reachedEnd);
		if (currentState == 1) checkOverlap(collector, undergroundStuff, collect, null, this);
		stats();
		enemyStats();
		updateScore();

		if (player.health <= 0) continueDialog();
		if (familiar.health <= 0) {
			familiar.kill();
			familiar.isDead = true;
		}
		if (enemy.health <= 0) {
			var x = enemy.atk;
			enemy.kill();
			spawnEnemy(x * 2, x * 2);
			score += 1000;
		}

		checkOverlap(attack, enemy, function() {
			enemy.health -= player.atk;
			attack.kill();
		});

		setVelocity(collector, 0, 0);
		if (!inConvo && !paused) {
			switch(currentState) {
				case 0:
					
					break;
				case 1:
					if (keyIsDown(W_KEY)) {
						setVelocityY(collector, -(collector.constVelocity));
					} 
					if (keyIsDown(S_KEY)) {
						setVelocityY(collector, (collector.constVelocity));
					}
					if (keyIsDown(A_KEY)) {
						setVelocityX(collector, -(collector.constVelocity));
					} 
					if (keyIsDown(D_KEY)) {
						setVelocityX(collector, (collector.constVelocity));
					}
					undergroundStuff.forEach(function(item) {
						item.body.velocity.x = -200;
					});
					break;
				case 2:
					break;
				case 3:
					checkOverlap(attack, friends, function(attack, friend) {
						friend.health -= enemy.atk;
						attack.kill();
					});
					break;
			}
		}
		if (paused) {
			undergroundStuff.forEach(function(item) {
				item.body.velocity.x = 0;
			});
		}
	},

	shutdown: function() {
		fadeOut(player, 2000, Phaser.Easing.Linear.None, true);
		fadeOut(layer, 2000, Phaser.Easing.Linear.None, true);
		music.stop();
	},

	paused: function() {
		createJunk.pause();
	}
}