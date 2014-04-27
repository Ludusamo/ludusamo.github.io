	  ___    ___ ________  ___  ___  ________   ________          ________  ___  ___      ___    ___ 
	 |\  \  /  /|\   __  \|\  \|\  \|\   ___  \|\   ____\        |\   ____\|\  \|\  \    |\  \  /  /|
	 \ \  \/  / | \  \|\  \ \  \\\  \ \  \\ \  \ \  \___|        \ \  \___|\ \  \\\  \   \ \  \/  / /
	  \ \    / / \ \  \\\  \ \  \\\  \ \  \\ \  \ \  \  ___       \ \  \  __\ \  \\\  \   \ \    / / 
	   \/  /  /   \ \  \\\  \ \  \\\  \ \  \\ \  \ \  \|\  \       \ \  \|\  \ \  \\\  \   \/  /  /  
	 __/  / /      \ \_______\ \_______\ \__\\ \__\ \_______\       \ \_______\ \_______\__/  / /    
	|\___/ /        \|_______|\|_______|\|__| \|__|\|_______|        \|_______|\|_______|\___/ /     
	\|___|/                                                                             \|___|/      
	                                                                                                 
	                                                                                                 

Theme: Underneath The Surface
The way I implemented this theme into my game is that the main character's abilities
are based on the fact that he is a hidden mage that can draw magic using his special magic
"collector" that is underground that gathers the hidden mana shards that lay underneath.
This collector is delicate though and when it smashes into something, our young mage cannot
gather any more mana for a little bit (AKA through his and his opponent's attacking turns).

Gameplay:
	WASD to move characters.
	Mouse to Interact with Buttons.
	J to Interact with NPC's.

	First Screen: Story
		The first screen you load into is the story screen. Feel free to wait for all of the
		text that will eventually pass through, but if you don't feel like it, I will leave
		the story (which is actually a poem) at the bottom of this read me.
		Talk to the man to advance.
	Second Screen: Town
		This screen is where you can talk to some of the towns people. Otherwise, there is
		not much purpose to this screen.
		Go talk to the man in red to advance to the battles.
	Third Screen: Arena
		Alright this is where some explaining needs to be done. There are three phases to
		a battle which I will explain here.

		Phase 1:
			This phase is when the mana crystals and the rocks come out. You control the
			blue spherical collector. You want to collect the mana crystals while avoiding
			the rocks. If you get hit by a rock you will move on to phase 2.
		Phase 2:
			This phase is when you attack. You have three buttons in the middle of the GUI.
			The leftmost one is for summoning a familiar, he will tank shots for you, it costs 75 mana.
			Your familiar's health is 2x your opponents attack + half your opponents attack.  
			The middle is a damage boost. It will increment your attack by 1. It costs 20 mana.
			The last one is a magic spell. This is your damage dealer. It costs 10 mana.
			This phase ends when either you click the little play button to continue or
			when your opponent is dead.
		Phase 3:
			This phase is when your opponent attacks. He will always drop a sword straight down
			on your head dealing you for the damage of his attack. The phase will end after
			you receive the damage.

			BUG: There is a little bug that I have been unable to work out, and that is as time goes
			on you can glitch out of the walls. This is probably cuz I am overloading it and its lagging
			out but I cannot find it, shouldn't be TOO detrimental to gameplay though.

		These phases will cycle on forever adding to your points. The game only ends when you 
		run out of health. If your opponent dies, another will take his place, but stronger.
		When your opponent dies you will also receive one health.

		Scoring:
			Scoring is done by action.
			For every mana crystal collected you get 10 points.
			For every familiar summoned you get 200 points.
			For every damage boost you get 100 points.
			For every magic spell you get 50 points.
			For every enemy killed you get 1000 points.

		Once the game ends you will be returned to the town screen.

Extra Notes and Reflection:
	So I had a lot of fun during this LD. I managed to learn a new game framework whilst making
	a game with it within 48 hours and I feel pretty proud of what I accomplished. Sure the code
	is hacked together but there is only so much one can do in 48 hours.

	Oh and almost forgot.
	Story:
		No one ever paid much attention,
		to the young guy who walked in town,
		what they did not know,
		was that this young guy was about to blow,
		He had been shunned,
		His father murdered,
		Something inside him stirred,
		To rise to power,
		To avenge his father,
		To win the kings duel.

		“All come to the king’s arena”,
		Shouts the crier
		“Leave thine pitiful lives,
		fight for honor and glory,
		and take the crown”.

		They all laughed,
		at his declaration to fight,
		but did not stop him as it was his right,
		However,
		What they did not know,
		About this young guy who was about to blow,
		That as he went unnoticed,
		He had a special skill,
		That was about to give the crowd quite a thrill.

	I feel pretty happy with the outcome though and I hope you guys will enjoy the game as well.

- Ludusamo
