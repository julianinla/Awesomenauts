game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
		me.levelDirector.loadLevel("level2"); //loading the map

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

		var spendGold = me.pool.pull("SpendGold", 0, 0, {});
		//incorporates SpendGold into play.js
		me.game.world.addChild(spendGold, 0);
		//adds it into actual game

		game.data.minimap = me.pool.pull("minimap", 10, 10, {});
		//adds minimap entity into the pool from game.js
		me.game.world.addChild(game.data.minimap, 30);
		//adds minimap to the "world"

		this.resetPlayer(0, 10);
		//reset or respawn the player
		me.input.bindKey(me.input.KEY.B, "buy");
		//binds b to buy stuff in spend gold
		me.input.bindKey(me.input.KEY.Q, "skill1");
		//binds q for skill 1 select?
		me.input.bindKey(me.input.KEY.W, "skill2");
		//binds w for skill 2 select?
		me.input.bindKey(me.input.KEY.E, "skill3");
		//binds e for skill 3 select?
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
		game.data.player = me.pool.pull("player", x, y, {}); 
		//player recreate from game.js
		me.game.world.addChild(game.data.player, 7); 
		//adding into "world"
		game.data.miniPlayer = me.pool.pull("miniplayer", 10, 10, {}); 
		//player recreate from game.js
		me.game.world.addChild(game.data.miniPlayer, 31); 
		//adding into "world"
	}
	//reset player function
});
