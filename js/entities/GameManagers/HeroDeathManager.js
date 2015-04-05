game.HeroDeathManager = Object.extend({	init: function(x, y, settings) {
		this.alwaysUpdate = true;
		//makes it always update
	},

	update: function() {
		if(game.data.player.dead) {
			me.game.world.removeChild(game.data.player); //remove dead player body
			me.game.world.removeChild(game.data.miniPlayer); //removes miniplayer from minimap
			me.state.current().resetPlayer(10, 0); //respawn the player 
		}
		//if the player is dead
	} 
});