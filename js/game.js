
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
		option1: "", //empty var for pointer release
		option2: "", //epmty var for pointer release
		enemyBaseHealth: 10, //global var for enemy base health 
		playerBaseHealth: 10, //global var for player base health 
		enemyCreepHealth: 5, //global var for creep health
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
		heroDeathManager: "", //global var death manager
		spearTimer: 15000,
		player: "",
		exp: 0, //experience var number
		gold: 0, //number of gold player has
		//added vars for cost of things in buyscreen
		skill1: 0,
		skill2: 0,
		skill3: 0,
		ability1: 0,
		ability2: 0,
		ability3: 0,
		//different options for use of experience below
		exp1: 0, 
		exp2: 0,
		exp3: 0,
		exp4: 0,
		win: "",
		pausePos: "", 
		buyscreen: "",
		//2 new random vars
		buytext: "",
		minimap: "", //empty minimap global var
		miniplayer: "" //empty miniplayer var
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

	me.state.SPENDEXP = 112;
	//gives number value to spendexp
	me.state.LOAD = 113;
	//gives number value to load
	me.state.NEW = 114;
	//gives number value to load

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
		me.pool.register("SpendGold", game.SpendGold);
		//GameManager for handling buying stuff w/ gold
		me.pool.register("spear", game.SpearThrow, true);
		//adds spear entity into entity pool
		me.pool.register("minimap", game.MiniMap, true);
		//registers minimap in entity pool
		me.pool.register("miniplayer", game.MiniPlayerLocation, true);
		//registers minimap in entity pool

		me.state.set(me.state.MENU, new game.TitleScreen()); //gives info for menu state
		me.state.set(me.state.PLAY, new game.PlayScreen()); //gives info for play state
		me.state.set(me.state.SPENDEXP, new game.SpendExp()); //gives info for spend exp state
		me.state.set(me.state.LOAD, new game.LoadProfile()); //gives info for load profile state
		me.state.set(me.state.NEW, new game.NewProfile()); //gives info for new profile state

		// Start the game.
		me.state.change(me.state.MENU);
		//changed starting screen a title screen
	}
};
