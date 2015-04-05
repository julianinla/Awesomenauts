game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings) /* initialize player */ {
		this.setSuper(x, y, settings); //sets up the super class
		this.setPlayerTimers(); //stores player timers
		this.setAttritbutes(); //sets attributes

		this.type = "PlayerEntity";
		//gives player entity a type 

		this.setFlags(); //sets flags?

		this.attack = game.data.playerAttack;

		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		//makes screen follow player movement

		this.addAnimation(); //function adds animation

		this.renderable.setCurrentAnimation("idle");
		//sets current animation to the idle
	},

	setSuper: function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image: "player", //selecting image
			width: 64, // width of player
			height: 64, //height of player
			spritewidth: "64", // same as width
			spriteheight: "64", // same as height
			getShape: function() {
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			} //creating shape based on selection in image
		}]);
	},
	//holds the init super class for player

	setPlayerTimers: function() {
		this.now = new Date().getTime();
		//sets variable to current date/time
		this.lastHit = this.now;
		//finds the date when your last hit player
		this.lastAttack = new Date().getTime();
		this.lastSpear = this.now;
	},
	//will store all of our timers

	setAttritbutes: function() {
		this.health = game.data.playerHealth;
		//sets health of player to 2
		//used global var
		this.body.setVelocity(game.data.playerMoveSpeed + (game.data.exp2 * 3), 20);
		//tells movement of player when moved
		//changed position 0 to 20
	},
	//holds all data for player attributes

	setFlags: function() {
		this.facing = "right";
		//keeps track of which direction player facing
		this.dead = false;
		//flag for player death
		this.attacking = false;
	},
	//contains flags

	addAnimation: function() {
		this.renderable.addAnimation("idle", [65]);
		//setting an idle image
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		//creating a walk animation using orcSpear img
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72, 71], 80);
		//creating an animationg for attacking
	},
	//adds animations for the players

	update: function(delta) {
		this.now = new Date().getTime();

		this.dead = this.checkIfDead();
		//dead var is equal to result of func

		this.checkKeyPressesAndMove();
		//function checks for movement 

		this.checkAbilityKeys();

		this.setAnimation();
		//calls set animation rather than animation code in update

		me.collision.check(this, true, this.collideHandler.bind(this), true);
		//handles player collisions
		this.body.update(delta);
		//lets game know to update screen

		this._super(me.Entity, "update", [delta]);
		//updates in real time

		return true;
	},

	checkIfDead: function() {
		if(this.health <= 0) {
			return true;
			//the player is "dead"
		}
		//if players health hits 0
	},

	checkKeyPressesAndMove: function() {
		if(me.input.isKeyPressed("right")) {
			this.moveRight();
			//replaces code with move right function
		}
		else if(me.input.isKeyPressed("left")) {
			this.moveLeft();
			//replaces code with move left function
		}
		else {
			this.body.vel.x = 0;
			//if not pressing, no change in velocity
		}

		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
			this.jump();
		}
		//allows for jumping when key is pressed, 
		//and if not jumping/falling already

		this.attacking = me.input.isKeyPressed("attack");
	},
	//movement for checking the movement of player

	moveRight: function() {
		this.body.vel.x += this.body.accel.x * me.timer.tick;
		//current postion changes by setVelocity() 
		//me.timer.tick keeps movement smooth
		this.flipX(true);
		//flips the animation for right movement
		this.facing = "right";
		//says youre facing right
	},


	moveLeft: function() {
		this.body.vel.x -= this.body.accel.x * me.timer.tick;
		//current postion changes by setVelocity() 
		//me.timer.tick keeps movement smooth
		this.flipX(false);
		//stops animation from flipping to right when moving left
		this.facing = "left";
		//says youre facing left
	},

	jump: function() {
		this.body.jumping = true;
		//sets precreated jumping var to true
		this.body.vel.y -= this.body.accel.y * me.timer.tick;
		//causes jump to actually happen
	},

	checkAbilityKeys: function() {
		if (me.input.isKeyPressed("skill1")) {
			// this.speedBurst();
		} //if you use skill 1
		else if (me.input.isKeyPressed("skill2")) {
			// this.eatCreep();
		} // if you use skill 2
		else if (me.input.isKeyPressed("skill3")) {
			this.throwSpear(); //goes to throwSpear function
		} //if you use skill 3
	},

	throwSpear: function() {
		if((this.now - this.lastSpear) >= game.data.spearTimer && game.data.ability3 > 0) {
			this.lastSpear = this.now;
			//resets time
			var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {}, this.facing);
			//pulls spear class from pool
			me.game.world.addChild(spear, 10);
			//inserts spear into actual game
		}
		//if you wait between throws and have ability
	},

	setAnimation: function() {
		if(this.attacking) {
			if(!this.renderable.isCurrentAnimation("attack")) {
				this.renderable.setCurrentAnimation("attack", "idle");
				//sets current animation then switches over
				this.renderable.setAnimationFrame();
				//begins animation from beginning not 
				//from left off
			}
			//uses animation if not already in use
		}
		//shows action on attacking
		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
			if(!this.renderable.isCurrentAnimation("walk")) {
				this.renderable.setCurrentAnimation("walk");
				//makes walk animation occur when moving
				//does so if not already walk animation
			}
		} 
		//adds if statement for movement
		else if(!this.renderable.isCurrentAnimation("attack")) {
			this.renderable.setCurrentAnimation("idle");
			//makes sure to switch back to idle animation
		}
	},
	//set animation function essentially sees animation and changes

	collideHandler : function(response) {
		if(response.b.type === 'EnemyBaseEntity') {
			this.collideWithEnemyBase(response);
		}
		//sees if player is colliding w/ enemy base
		//if so...
		else if (response.b.type === 'EnemyCreep')  {
			this.collidWithEnemyCreep(response);
		}
		//if player collides with creep
	},
	//collideHandler function creates collsision for player w/ objects

	collideWithEnemyBase: function(response) {
		var ydif = this.pos.y - response.b.pos.y;
		//represnets difference between players y position and bases
		var xdif = this.pos.x - response.b.pos.x;
		//represnets difference between players x position and bases

		if(ydif < -40 && xdif < 70 && xdif > -35) /* only checking if necaessary */ {
			this.body.falling = false;
			//stops player from fallng into base
			this.body.vel.y = - 1;
			//pushes player up from top
		}
		//need to check ydif first
		else if(xdif > -35 /* xdif relation to found number */ && 
		this.facing === 'right'  /* need to know which way facing */ && 
		(xdif < 0)) {
			this.body.vel.x = 0;
			//stop player from moving
			this.pos.x = this.pos.x - 1;
			//slightly move player backwards
		}
		else if(xdif < 70 /* xdif relation to found number */ && 
		this.facing === 'left' /* need to know which way facing */ && 
		(xdif > 0)) {
			this.body.vel.x = 0;
			//stop player movement
			this.pos.x = this.pos.x + 1;
			//move player away slightly
		}


		if(this.renderable.isCurrentAnimation("attack") && 
			this.now - this.lastHit >= game.data.playerAttackTimer /* uses timing global var */ ) {
			this.lastHit = this.now;
			response.b.loseHealth(game.data.playerAttack + (game.data.exp3 * 5));
			//causes to remove health
			//uses global var
		}
		//attack on collision
	},
	//collide function for interaction w/ enemy base

	collidWithEnemyCreep: function(response) {
		var xdif = this.pos.x - response.b.pos.x; //sets xdif to x position
		var ydif = this.pos.y - response.b.pos.y; //sets ydif to y position

		this.stopMovement(xdif);
		//function for stopping movement in colllision

		this.checkAttack(xdif, ydif, response);
		//for having an attack with collided
	},
	//collide function for interaction w/ enemy creep

	stopMovement: function(xdif) {
		if(xdif > 0) {
			this.pos.x = this.pos.x + 1;
			if (this.facing === "left") {
				this.body.vel.x = 0;
			}
			//prevents left movement with creep
		}
		else {
			this.pos.x = this.pos.x - 1;
			if (this.facing === "right") {
				this.body.vel.x = 0;
			}
			//prevents right movement with creep
		}
	},
	//function to stop movement on collision

	checkAttack: function(xdif, ydif, response) {
		if(this.renderable.isCurrentAnimation("attack") &&
			this.now - this.lastHit >= game.data.playerAttackTimer /* uses global var */ 
			&& (Math.abs(ydif) <= 40) && 
			(((xdif > 0) && this.facing === "left") || ((xdif < 0) && this.facing === "right"))) {
			this.lastHit = this.now; //makes current health health
			response.b.loseHealth(game.data.playerAttack + (game.data.exp3 *3)); //used global var
			//lose 1 health from this
			if(response.b.losehealth <= game.data.playerAttack) {
				game.data.gold += 1; //give the player gold
				console.log("Gold: " + game.data.gold);
			}
			//if the creep dies basically ...
		}
		//function activates attack based on ...
	},
	//attack function for creep collisions

	loseHealth : function(damage) {
		this.health = this.health - damage;
		//substracts health on attack
	}
});
//create player entity for use in game










