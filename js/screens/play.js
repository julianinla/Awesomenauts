game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;

		me.levelDirector.loadLevel("level2"); //loading the map

		this.resetPlayer(0, 420);
		//reset or respawn the player

		var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {});
		//incorporates GameTimerManager into play.js
		me.game.world.addChild(gameTimerManager, 0);
		//adds it into actual game

		var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
		//incorporates HeroDeathManager into play.js
		me.game.world.addChild(heroDeathManager, 0);
		//adds it into actual game

		var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
		//incorporates ExperienceManager into play.js
		me.game.world.addChild(experienceManager, 0);
		//adds it into actual game

		me.input.bindKey(me.input.KEY.RIGHT, "right");
		//binding right to be able to perform action
		me.input.bindKey(me.input.KEY.LEFT, "left");
		//binding left to be able to perform action
		me.input.bindKey(me.input.KEY.Z, "attack");
		//binding a key for attacking w/ player
		me.input.bindKey(me.input.KEY.SPACE, "jump");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},

	resetPlayer: function(x, y) {
		game.data.player = me.pool.pull("player", 0, 420, {}); 
		//player recreate from game.js
		me.game.world.addChild(game.data.player, 5); 
		//adding into "world"
	}
	//reset player function
});
