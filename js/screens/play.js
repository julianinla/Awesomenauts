game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;

		me.levelDirector.loadLevel("level1"); //loading the map

		var player = me.pool.pull("player", 0, 420, {}); 
		//player create from game.js
		me.game.world.addChild(player, 5); 
		//adding into "world"

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
	}
});
