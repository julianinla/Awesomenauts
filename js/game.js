
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
		enemyBaseHealth: 10, //global var for enemy base health 
		playerBaseHealth: 10, //global var for player base health 
		enemyCreepHealth: 10, //global var for creep health
		playerHealth: 20, //global var for players health
		gloopHealth: 10, //global var for teammate health
		enemyCreepAttack: 1, //damage for creeps attack
		playerAttack: 1, //damage for players attack
		gloopAttack: 1, //global var for gloop attack
		playerAttackTimer: 1000, //time for player attack
		creepAttackTimer: 500, //time for creep attack
		gloopAttackTimer: 500, //time for creep attack
		playerMoveSpeed: 5, //speed of player
		creepMoveSpeed: 5, //speed of creep
		gloopMoveSpeed: 5, //speed of creep
		gameTimerManager: "", //global var game manager
		heroDeathManager: "", //global var death managerr
		player: "",
		exp: 0, //experience var number
		gold: 0, //number of gold player has
		//different options for use of experience below
		exp1: 0, 
		exp2: 0,
		exp3: 0,
		exp4: 0,
		win: ""
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) /* changed screen size */ {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}

	me.save.add({
		exp: 0,
		exp1: 0,
		exp2: 0,
		exp3: 0,
		exp4: 0
	});
	//function to save exp values

	me.state.SPENDEXP = 112;
	//gives number value to spendexp

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
		me.pool.register("player", game.PlayerEntity, true);
		//make game load player entity
		me.pool.register("PlayerBase", game.PlayerBaseEntity);
		//loading the PlayerBase entity in game.js
		me.pool.register("EnemyBase", game.EnemyBaseEntity);
		//loading the EnemyBase entity
		me.pool.register("EnemyCreep", game.EnemyCreep, true);
		//loading the EnemyCreep entity
		me.pool.register("EnemyGloop", game.EnemyGloop, true);
		//loading the EnemyCreep entity
		me.pool.register("JumpTrigger", game.JumpTrigger);
		//jump trigger entity for jumping
		me.pool.register("GameTimerManager", game.GameTimerManager);
		//GameManager for things like timers, added to pool
		me.pool.register("HeroDeathManager", game.HeroDeathManager);
		//GameManager for things like your players death
		me.pool.register("ExperienceManager", game.ExperienceManager);
		//GameManager for handling experience the player earns

		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
		me.state.set(me.state.SPENDEXP, new game.SpendExp());

		// Start the game.
		me.state.change(me.state.MENU);
		//changed starting screen a title screen
	}
};
