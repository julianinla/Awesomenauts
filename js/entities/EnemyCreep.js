game.EnemyCreep = me.Entity.extend({
	init : function(x, y, settings) {
		this.setSuper(x, y, settings);
		//holds super animation for the creep

		this.health = game.data.enemyCreepHealth; //uses a global var
		//sets health to 2
		this.alwaysUpdate = true;
		//makes always update

		this.facing = 'left';

		this.attacking = false;
		//sets variable attacking to false

		this.setPlayerTimers();
		//holds all of the timer vars

		this.body.setVelocity(3, 20);
		//sets the movement velocity of EnemyCreep

		this.type = "EnemyCreep";
		//gives entity a type

		this.setAnimation();
		this.renderable.setCurrentAnimation("walk");
		//sets the current animation to walk
	},

	setSuper: function(x, y, settings) {
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
	},

	setPlayerTimers: function() {
		this.lastAttacking = new Date().getTime();
		this.lastHit = new Date().getTime();
		this.now = new Date().getTime();
		//all for spacing out time in update function
	},

	setAnimation: function() {
		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		//creates a walk animation
	},

	update : function(delta) {
		if(this.health <= 0) {
			me.game.world.removeChild(this);
			//removes creep when health reaches 0
		}

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
			this.collideWithPlayerBase(response);
			//collisions for player base
		} //if the creep hits player base
		else if (response.b.type === 'PlayerEntity') {
			this.collideWithPlayer(response);
			//handles collisions with player
		}
		else if (response.b.type === 'EnemyGloop') {
			this.collideWithGloop(response);
			//handles collisions w/ gloop teammate
		}
		else if (response.b.type === 'JumpTrigger') {
			this.jumpTrigger(response);
			//handles the jump trigger
		}	
	},

	collideWithPlayerBase: function(response) {
		this.attacking = true;
		this.lastAttacking = this.now;
		this.body.vel.x = 0;
		//stops movement
		this.pos.x = this.pos.x + 1; 
		//keeps moving creep to right to maintain its position
		if(this.now - this.lastHit >= 1000) {
			this.lastHit = this.now;
			//reset?
			response.b.loseHealth(game.data.enemyCreepAttack); //uses global var
			//calls loseHealth function with one damage
		}
		//times out the hits
	},

	collideWithPlayer: function(response) {
		var xdif = this.pos.x - response.b.pos.x;
			//creates var that is based on position of creep

		this.attacking = true;
		//makes attacking at this moment
		this.lastAttacking = this.now;
		//makes last attack at this moment
		this.body.vel.x = 0;
		//stops movement

		if(xdif > 0) {
			this.pos.x = this.pos.x + 1; 
			//keeps moving creep to right to maintain its position
			this.body.vel.x = 0;
			//stops movement
		}	

		if ((this.now - this.lastHit >= 1000) && xdif > 0) {
			this.lastHit = this.now;
			//reset?
			response.b.loseHealth(game.data.enemyCreepAttack); //uses global var
			//calls loseHealth function with one damage
		}
		//times out the hits
	},

	collideWithGloop: function(response) {
		var xdif = this.pos.x - response.b.pos.x;
		//creates var that is based on position of creep

		this.attacking = true;
		//makes attacking at this moment
		this.lastAttacking = this.now;
		//makes last attack at this moment
		this.body.vel.x = 0;
		//stops movement

		if(xdif > 0) {
			this.pos.x = this.pos.x + 1; 
			//keeps moving creep to right to maintain its position
			this.body.vel.x = 0;
			//stops movement
		}	

		if ((this.now - this.lastHit >= 1000) && xdif > 0) {
			this.lastHit = this.now;
			//reset?
			response.b.loseHealth(game.data.enemyCreepAttack); //uses global var
			//calls loseHealth function with one damage
		}
		//times out the hits
	},

	jumpTrigger: function(response) {
		var xdif = this.pos.x - response.b.pos.x;
		//gives xdif a value

		if (xdif < 61) {
			this.body.jumping = true;
			//sets jumping to true
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
			//causes actual jump to occur
		}
	},

	loseHealth: function(damage) {
		this.health = this.health - damage;
		//losehealth function to take damage
		console.log("Health: " + this.health)
	},

});
//EnemyCreep entity to create enemy 