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
			game.data.gold += (game.data.exp1 + 1); //gives gold to player
		}
		//does something if 20 sec since last
	},

	creepTimerCheck: function() {
		if(Math.round(this.now/game.data.creepAttackTimer) % 10 === 0 && 
			(this.now - this.lastCreep >= game.data.creepAttackTimer)) {
			this.lastCreep = this.now;
			//resets time
			var creepe = me.pool.pull("EnemyCreep", 3350, 0, {});
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

game.SpendGold = Object.extend({
	init: function (x, y, settings) {
		this.now = new Date().getTime();
		//makes now the current date/time
		this.lastBuy = new Date().getTime();
		//makes lastBuy equal to the current date/time

		this.alwaysUpdate = true;
		//makes it always update

		this.paused = false;
		this.updateWhenPaused = true;
		//variables for pausing

		this.buying = false;
		//says not currently buying
	},

	update: function () {
		this.now = new Date().getTime();
		//makes now the current date/time
		
		if(me.input.isKeyPressed("buy") && this.now - this.lastBuy >= 1000) {
			this.lastBuy = this.now;
			//update the lastBuy timer

			if(!this.buying) {
				this.startBuying();
				//causes you to start buying
			}
			//if you are not currently buying
			else {
				this.stopBuying();
				//ends buying
			}
			//if you are buying
		}
		//if hit buy screen

		return true;
	},
	//update function for later

	startBuying: function() {
		this.buying = true;
		//makes sure in right function later
		me.state.pause(me.state.PLAY);
		game.data.pausePos = me.game.viewport.localToWorld(0, 0);
		//kinda says add where currently
		game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
		//tells game where to add buyscreen
		game.data.buyscreen.updateWhenPaused = true;
		//says screen updates when u pause
		game.data.buyscreen.setOpacity(0.8);
		//makes the buyscreen slightly opaque
		me.game.world.addChild(game.data.buyscreen, 34);
		//adds the buyscreen into the game
		game.data.player.body.setVelocity(0, 0);
		//stops the player from being able to move while buying
		me.input.bindKey(me.input.KEY.F1, "F1", true);
		me.input.bindKey(me.input.KEY.F2, "F2", true);
		me.input.bindKey(me.input.KEY.F3, "F3", true);
		me.input.bindKey(me.input.KEY.F4, "F4", true);
		me.input.bindKey(me.input.KEY.F5, "F5", true);
		me.input.bindKey(me.input.KEY.F6, "F6", true);
		//key binds for buyscreen
		this.setBuyText();
		//calls function that adds text for buyscreen
	},
	//opens up buying screen

	setBuyText: function() {
		game.data.buytext = new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
				//basic settings for the buyscreen
				this.font = new me.Font("Arial", 26, "white");
				//font used in buyscreen 
				this.updateWhenPaused = true;
				this.alwaysUpdate = true;
				//pause vars again
			},

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B TO EXIT, CURRENT GOLD: " + game.data.gold, this.pos.x, this.pos.y);
				//draw spend gold screen, gives command options
				this.font.draw(renderer.getContext(), "SKILL 1: CURRENT LEVEL: " + game.data.skill1 + " COSTS: " + ((game.data.skill1 + 10) * 10), this.pos.x, this.pos.y + 40); //skill1 in buyscreen
				this.font.draw(renderer.getContext(), "SKILL 2: CURRENT LEVEL: " + game.data.skill2 + " COSTS: " + ((game.data.skill2 + 10) * 10), this.pos.x, this.pos.y + 80); //skill2 in buyscreen
				this.font.draw(renderer.getContext(), "SKILL 3: CURRENT LEVEL: " + game.data.skill3 + " COSTS: " + ((game.data.skill3 + 10) * 10), this.pos.x, this.pos.y + 120); //skill3 in buyscreen
				this.font.draw(renderer.getContext(), "Q ABILITY: CURRENT LEVEL: " + game.data.ability1 + " COSTS: " + ((game.data.ability1 + 10) * 10), this.pos.x, this.pos.y + 160); //ability1 in buyscreen
				this.font.draw(renderer.getContext(), "W ABILITY: CURRENT LEVEL: " + game.data.ability2 + " COSTS: " + ((game.data.ability2 + 10) * 10), this.pos.x, this.pos.y + 200); //ability2 in buyscreen
				this.font.draw(renderer.getContext(), "E ABILITY: CURRENT LEVEL: " + game.data.ability3 + " COSTS: " + ((game.data.ability3 + 10) * 10), this.pos.x, this.pos.y + 240); //ability3 in buyscreen
			},
			//used as main function to draw on screen
		}));
		//renderable opneing buyscreen 

		me.game.world.addChild(game.data.buytext, 35);
		//adds draw for buyscreen text
	},

	stopBuying: function() {
		this.buying = false;
		//makes sure in right function later
		me.state.resume(me.state.PLAY);
		//resumes the actual game
		game.data.player.body.setVelocity(game.data.playerMoveSpeed + (game.data.exp2 * 3), 20);
		//allows player to move again
		me.game.world.removeChild(game.data.buyscreen);	
		//closes out of the buyscreen
		me.input.unbindKey(me.input.KEY.F1, "F1", true);
		me.input.unbindKey(me.input.KEY.F2, "F2", true);
		me.input.unbindKey(me.input.KEY.F3, "F3", true);
		me.input.unbindKey(me.input.KEY.F4, "F4", true);
		me.input.unbindKey(me.input.KEY.F5, "F5", true);
		me.input.unbindKey(me.input.KEY.F6, "F6", true);ee
		//removes key binds for buyscreen
		me.game.world.removeChild(game.data.buytext);
		//removes text after close buyscreen
	}
	//stops the buying screen
});
//spend gold manager for handling buying stuff w/ gold