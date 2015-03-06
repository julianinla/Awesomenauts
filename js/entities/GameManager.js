game.GameTimerManager = Object.extend({
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

		this.goldTimerCheck();
		this.creepTimerCheck();
		this.gloopTimerCheck();

		return true;
		//always for update functions
	},

	goldTimerCheck: function() {
		if(Math.round(this.now/game.data.creepAttackTimer) % 20 === 0 && 
			(this.now - this.lastCreep >= game.data.creepAttackTimer)) {
			game.data.gold += 1; //gives gold to player
		}
		//does something if 20 sec since last
	},

	creepTimerCheck: function() {
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
	},

	gloopTimerCheck: function() {
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
	}
});
//handles things like timers, not entities

game.HeroDeathManager = Object.extend({	init: function(x, y, settings) {
		this.alwaysUpdate = true;
		//makes it always update
	},

	update: function() {
		if(game.data.player.dead) {
			me.game.world.removeChild(game.data.player); //remove dead player body
			me.state.current().resetPlayer(10, 0); //respawn the player 
		}
		//if the player is dead
	} 
});

game.ExperienceManager = Object.extend({
	init: function(x, y, settings) {
		this.alwaysUpdate = true;
		//makes game always update
		this.gameover = false;
		//sets gameOver to false
	},
	//initializes all vars

	update: function() {
		if (game.data.win === true && !this.gameover) {
			this.gameOver(true);
			//passes in false, tells game you won
		}
		//if the player wins and game is over
		else if (game.data.win === false && !this.gameover) {
			this.gameOver(false);
			//passes in false, tells gmae you lost
		}
		//if the player loses and game is over

		return true;
	},

	gameOver: function(win) {
		if(win) {
			game.data.exp += 10;
			//gives the player 10 exp points
		} 
		//if you won game
		else {
			game.data.exp += 1;
			//gives the player 1 exp point
		}
		//if you lost
		
		this.gameover = true;
		//sets gameOver to true
		me.save.exp = game.data.exp;
		//saves your exp in melonjs
	}
});
//ExperienceManager for player experience