game.GameManager = Object.extend({
	init : function(x, y, settings) {
		this.now = new Date().getTime();
		//makes now the current date/time
		this.lastCreep = new Date().getTime();
		//makes lastCreep equal to the current date/time
		this.lastGloop = new Date().getTime();
		//makes lastCreep equal to the current date/time

		this.alwaysUpdate = true;
		//makes it always update

		this.paused = false;
	},
	//initialization function for gamemanager

	update: function() {
		this.now = new Date().getTime();
		//gets now var

		if(game.data.player.dead) {
			me.game.world.removeChild(game.data.player); //remove dead player body
			me.state.current().resetPlayer(10, 0); //respawn the player 
		}
		//if the player is dead

		if(Math.round(this.now/game.data.creepAttackTimer) % 20 === 0 && 
			(this.now - this.lastCreep >= game.data.creepAttackTimer)) {
			game.data.gold += 1; //gives gold to player
		}
		//does something if 20 sec since last

		if(Math.round(this.now/game.data.creepAttackTimer) % 10 === 0 && 
			(this.now - this.lastCreep >= game.data.creepAttackTimer)) {
			this.lastCreep = this.now;
			//resets time
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			//pulls enemy creep class from pool
			me.game.world.addChild(creepe, 5);
			//inserts creep into actual game
		}
		//does something if 10 sec since last
		//timing used global var values

		if(Math.round(this.now/game.data.gloopAttackTimer) % 10 === 0 && 
			(this.now - this.lastGloop >= game.data.gloopAttackTimer)) {
			this.lastGloop = this.now;
			//resets time
			var gloope = me.pool.pull("EnemyGloop", 0, 0, {});
			//pulls enemy creep class from pool
			me.game.world.addChild(gloope, 5);
			//inserts creep into actual game
		}
		//does something if 10 sec since last
		//timing used global var values

		return true;
		//always for update functions
	},
});
//handles things like timers, not entities