game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings) /* initialize player */ {
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

		this.body.setVelocity(5, 20);
		//tells movement of player when moved
		//changed position 0 to 20

		this.facing = "right";
		//keeps track of which direction player facing

		this.now = new Date().getTime();
		//sets variable to current date/time
		this.lastHit = this.now;
		//finds the date when your last hit player 
		this.lastAttack = new Date();
		//havent used this yet

		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		//makes screen follow player movement

		this.renderable.addAnimation("idle", [65]);
		//setting an idle image
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		//creating a walk animation using orcSpear img
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72, 71], 80);
		//creating an animationg for attacking

		this.renderable.setCurrentAnimation("idle");
		//sets current animation to the idle
	},

	update: function(delta) {
		this.now = new Date().getTime();

		if(me.input.isKeyPressed("right")) {
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//current postion changes by setVelocity() 
			//me.timer.tick keeps movement smooth
			this.flipX(true);
			//flips the animation for right movement
			this.facing = "right";
			//says youre facing right
		}
		else if(me.input.isKeyPressed("left")) {
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			//current postion changes by setVelocity() 
			//me.timer.tick keeps movement smooth
			this.flipX(false);
			//stops animation from flipping to right when moving left
			this.facing = "left";
			//says youre facing left
		}
		else {
			this.body.vel.x = 0;
			//if not pressing, no change in velocity
		}

		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
			this.body.jumping = true;
			//sets precreated jumping var to true
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
			//causes jump to actually happen
		}
		//allows for jumping when key is pressed, 
		//and if not jumping/falling already

		if(me.input.isKeyPressed("attack")) {
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

		me.collision.check(this, true, this.collideHandler.bind(this), true);
		//handles player collisions
		this.body.update(delta);
		//lets game know to update screen

		this._super(me.Entity, "update", [delta]);
		//updates in real time

		return true;
	},

	collideHandler : function(response) {
		if(response.b.type === 'EnemyBaseEntity') {
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
		}
		//sees if player is colliding w/ enemy base
		//if so...

		if(this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= 1000) {
			this.lastHit = this.now;
			response.b.loseHealth();
		}
	}
	//collideHandler function creates collsision for player w/ objects
});
//create player entity for use in game

game.PlayerBaseEntity = me.Entity.extend({
	init: function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image: "tower", //img for entity
			width: 100, //width of base
			height: 100, //height of base 
			spritewidth: "100", //similar to width
			spriteheight: "100", //similar to height
			getShape: function() {
				return (new me.Rect(0, 0, 100, 70)).toPolygon();
			}
			//getShape function for use
		}]); 
		//build constructor by calling super

		this.broken = false; //tower not destroyed
		this.health = 10; //health of the tower
		this.alwaysUpdate = true; //update if not on screen 
		this.body.onCollision = this.onCollision.bind(this); //able to collide w/ tower
		this.type = "PlayerBase"; //sets type to Player Base

		this.renderable.addAnimation("idle", [0]);
		//add animation for unbroken tower
		this.renderable.addAnimation("broken", [1]);
		//add animation for broken tower
		this.renderable.setCurrentAnimation("idle");
		//sets the current animation to idle
	}, 
	//init function for initialize

	update: function(delta) {
		if(this.health <= 0) {
			this.broken = true; //breaks the tower
			this.renderable.setCurrentAnimation("broken");
			//sets the current animation to broken
		}
		//if health <= 0 then tower broken 
		this.body.update(delta); //update for this

		this._super(me.Entity, "update", [delta]); //have to call super
		return true;
	},
	//update function to update

	onCollision: function() {
		//empty onCollision function for later
	},

	loseHealth: function(damage) {
		this.health = this.health - damage;
	}
}); 
//base entity similar to player

game.EnemyBaseEntity = me.Entity.extend({
	init: function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image: "tower", //img for entity
			width: 100, //width of base
			height: 100, //height of base 
			spritewidth: "100", //similar to width
			spriteheight: "100", //similar to height
			getShape: function() {
				return (new me.Rect(0, 0, 100, 70)).toPolygon();
			}
			//getShape function for use
		}]); 
		//build constructor by calling super

		this.broken = false; //tower not destroyed
		this.health = 10; //health of the tower
		this.alwaysUpdate = true; //update if not on screen 
		this.body.onCollision = this.onCollision.bind(this); //able to collide w/ tower

		this.type = "EnemyBaseEntity"; //later for other collisions

		this.renderable.addAnimation("idle", [0]);
		//add animation for unbroken tower
		this.renderable.addAnimation("broken", [1]);
		//add animation for broken tower
		this.renderable.setCurrentAnimation("idle");
		//sets the current animation to idle
	}, 
	//init function for initialize

	update: function(delta) {
		if(this.health <= 0) {
			this.broken = true; //breaks the tower
			this.renderable.setCurrentAnimation("broken");
			//sets the current animation to broken
		}
		//if health <= 0 then tower broken 
		this.body.update(delta); //update for this

		this._super(me.Entity, "update", [delta]); //have to call super
		return true;
	},
	//update function to update

	onCollision: function() {
		//empty onCollision function for later
	},

	loseHealth: function() {
		this.health--;
	}
}); 
//base entity similar to player

game.EnemyCreep = me.Entity.extend({
	init : function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image: "creep1", //gives enemy image to creep1
			width: 32, //sets width to 32
			height: 64, //sets height to 64
			spritewidth: "32", //same as width
			spriteheight: "64", //same as height
			getShape: function() {
				return (new me.Rect(0, 0, 32, 64)).toPolygon();
			}
			//getShape function creates rectangle for enemy
		}]);

		this.health = 2;
		//sets health to 2
		this.alwaysUpdate = true;
		//makes always update

		this.attacking = false;
		//sets variable attacking to false

		this.lastAttacking = new Date().getTime();
		this.lastHit = new Date().getTime();
		this.now = new Date().getTime();
		//all for spacing out time in update function

		this.body.setVelocity(3, 20);
		//sets the movement velocity of EnemyCreep

		this.type = "EnemyCreep";
		//gives entity a type

		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		//creates a walk animation
		this.renderable.setCurrentAnimation("walk");
		//sets the current animation to walk
	},

	update : function(delta) {
		this.now = new Date().getTime();
		//sets now to a current time

		this.body.vel.x -= this.body.accel.x * me.timer.tick;
		//causes creep to move

		me.collision.check(this, true, this.collideHandler.bind(this), true);
		//allows for creep collisions

		this.body.update(delta);
		//update makes this happen in real time

		this._super(me.Entity, "update", [delta]);
		//updates the entity
		return true;
		//required
	},

	collideHandler: function(response) {
		if(response.b.type === 'PlayerBase') {
			this.attacking = true;
			this.lastAttacking = this.now;
			this.body.vel.x = 0;
			//stops movement
			this.pos.x = this.pos.x + 1; 
			//keeps moving creep to right to maintain its position
			if(this.now - this.lastHit >= 1000) {
				this.lastHit = this.now;
				//reset?
				response.b.loseHealth(1);
				//calls loseHealth function with one damage
			}
			//times out the hits
		}
		//if the creep hits player base
	},

	loseHealth: function() {

	}

});
//EnemyCreep entity to create enemy 

game.GameManager = Object.extend({
	init : function(x, y, settings) {
		this.now = new Date().getTime();
		//makes now the current date/time
		this.lastCreep = new Date().getTime();
		//makes lastCreep equal to the current date/time

		this.alwaysUpdate = true;
		//makes it always update
	},
	//initialization function for gamemanager

	update: function() {
		this.now = new Date().getTime();
		//gets now var

		if(Math.round(this.now/1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
			this.lastCreep = this.now;
			//resets time
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			//pulls enemy creep class from pool
			me.game.world.addChild(creepe, 5);
			//inserts creep into actual game
		}
		//does something if 10 sec since last

		return true;
		//always for update functions
	},
});
//handles things like timers, not entities