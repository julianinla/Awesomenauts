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

		this.checkBuyKeys();

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
				this.font.draw(renderer.getContext(), "SKILL 1: CURRENT LEVEL: " + game.data.skill1 + " COSTS: " + ((game.data.skill1 + 1) * 10), this.pos.x, this.pos.y + 40); //skill1 in buyscreen
				this.font.draw(renderer.getContext(), "SKILL 2: CURRENT LEVEL: " + game.data.skill2 + " COSTS: " + ((game.data.skill2 + 1) * 10), this.pos.x, this.pos.y + 80); //skill2 in buyscreen
				this.font.draw(renderer.getContext(), "SKILL 3: CURRENT LEVEL: " + game.data.skill3 + " COSTS: " + ((game.data.skill3 + 1) * 10), this.pos.x, this.pos.y + 120); //skill3 in buyscreen
				this.font.draw(renderer.getContext(), "Q ABILITY: CURRENT LEVEL: " + game.data.ability1 + " COSTS: " + ((game.data.ability1 + 1) * 10), this.pos.x, this.pos.y + 160); //ability1 in buyscreen
				this.font.draw(renderer.getContext(), "W ABILITY: CURRENT LEVEL: " + game.data.ability2 + " COSTS: " + ((game.data.ability2 + 1) * 10), this.pos.x, this.pos.y + 200); //ability2 in buyscreen
				this.font.draw(renderer.getContext(), "E ABILITY: CURRENT LEVEL: " + game.data.ability3 + " COSTS: " + ((game.data.ability3 + 1) * 10), this.pos.x, this.pos.y + 240); //ability3 in buyscreen
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
		me.input.unbindKey(me.input.KEY.F6, "F6", true);
		//removes key binds for buyscreen
		me.game.world.removeChild(game.data.buytext);
		//removes text after close buyscreen
	},
	//stops the buying screen

	checkBuyKeys: function() {
		if (me.input.isKeyPressed("F1")) {
			if(this.checkCost(1)) {
				this.makePurchase(1);
				//links to makePurchase to actually buy
			}
			//goes to checkCost function, sees if skill1 can be bought
		}
		//if you press F1, select skill1
		else if (me.input.isKeyPressed("F2")) {
			if(this.checkCost(2)) {
				this.makePurchase(2);
				//links to makePurchase to actually buy
			}
			//goes to checkCost function, sees if skill2 can be bought
		}
		//if you press F2, select skill2
		else if (me.input.isKeyPressed("F3")) {
			if(this.checkCost(3)) {
				this.makePurchase(3);
				//links to makePurchase to actually buy
			}
			//goes to checkCost function, sees if skill3 can be bought
		}
		//if you press F3, select skill3
		else if (me.input.isKeyPressed("F4")) {
			if(this.checkCost(4)) {
				this.makePurchase(4);
				//links to makePurchase to actually buy
			}
			//goes to checkCost function, sees if ability1 can be bought
		}
		//if you press F4, select ability1
		else if (me.input.isKeyPressed("F5")) {
			if(this.checkCost(5)) {
				this.makePurchase(5);
				//links to makePurchase to actually buy
			}
			//goes to checkCost function, sees if ability2 can be bought
		}
		//if you press F5, select ability2
		else if (me.input.isKeyPressed("F6")) {
			if(this.checkCost(6)) {
				this.makePurchase(6);
				//links to makePurchase to actually buy
			}
			//goes to checkCost function, sees if ability3 can be bought
		}
		//if you press F6, select ability3
	},
	//determines which thing you wanna buy

	checkCost: function(skill) {
		if (skill === 1 && (game.data.gold >= ((game.data.skill1 + 1) * 10))) {
			return true; //says you can buy skill1
		}
		//checks if you can buy skill1
		if (skill === 2 && (game.data.gold >= ((game.data.skill2 + 1) * 10))) {
			return true; //says you can buy skill2
		}
		//checks if you can buy skill2
		if (skill === 3 && (game.data.gold >= ((game.data.skill3 + 1) * 10))) {
			return true; //says you can buy skill3
		}
		//checks if you can buy skill3
		if (skill === 4 && (game.data.gold >= ((game.data.ability1 + 1) * 10))) {
			return true; //says you can buy ability2
		}
		//checks if you can buy ability1
		if (skill === 5 && (game.data.gold >= ((game.data.ability2 + 1) * 10))) {
			return true; //says you can buy ability2
		}
		//checks if you can buy ability1
		if (skill === 6 && (game.data.gold >= ((game.data.ability3 + 1) * 10))) {
			return true; //says you can buy ability3
		}
		//checks if you can buy ability3
		else {
			return false; //returns false
		} 
		//otherwise dont do anything
	},
	//function checks cost of item, if you have enough gold to buy it

	makePurchase: function(skill) {
		if (skill === 1) {
			game.data.gold -= ((game.data.skill1 + 1) * 10); //takes gold away when purchase 
			game.data.skill1 += 1; //increases level of skill1
			game.data.playerAttack += 1;
		} 
		//purchase for skill1
		else if (skill === 2) {
			game.data.gold -= ((game.data.skill2 + 1) * 10); //takes gold away when purchase 
			game.data.skill2 += 1; //increases level of skill2 
		} 
		//purchase for skill2
		else if (skill === 3) {
			game.data.gold -= ((game.data.skill3 + 1) * 10); //takes gold away when purchase 
			game.data.skill3 += 1; //increases level of skill3 
		}
		//purchase for skill3
		else if (skill === 4) {
			game.data.gold -= ((game.data.ability1 + 1) * 10); //takes gold away when purchase 
			game.data.ability1 += 1; //increases level of ability1 
		}
		//purchase for skill4
		else if (skill === 5) {
			game.data.gold -= ((game.data.ability2 + 1) * 10); //takes gold away when purchase 
			game.data.ability2 += 1; //increases level of ability2
		}
		//purchase for skill5
		else if (skill === 6) {
			game.data.gold -= ((game.data.ability3 + 1) * 10); //takes gold away when purchase 
			game.data.ability3 += 1; //increases level of ability3 
		}
		//purchase for skill6
	} 
	//function for making purchases in buyscreen
});
//spend gold manager for handling buying stuff w/ gold