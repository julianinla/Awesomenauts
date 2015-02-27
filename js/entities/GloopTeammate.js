game.EnemyGloop = me.Entity.extend({
	init : function(x, y, settings) {
		this.setSuper();
		//super class for gloop teammate

		this.health = game.data.gloopHealth; //uses a global var
		//sets health to 2
		this.alwaysUpdate = true;
		//makes always update

		this.setFlags(); 
		//sets basic flag vars

		this.setGloopTimers();
		//holds the timers

		this.body.setVelocity(3, 20);
		//sets the movement velocity of EnemyCreep

		this.type = "EnemyGloop";
		//gives entity a type

		this.setAnimation();
		this.renderable.setCurrentAnimation("walk");
		//sets the current animation to walk
	},


	update : function(delta) {
		if(this.health <= 0) {
			me.game.world.removeChild(this);
			//removes creep when health reaches 0
		}

		this.now = new Date().getTime();
		//sets now to a current time

		this.body.vel.x += this.body.accel.x * me.timer.tick;
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

	setSuper: function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image: "creep2", //gives enemy image to creep1
			width: 100, //sets width to 32
			height: 85, //sets height to 64
			spritewidth: "100", //same as width
			spriteheight: "85", //same as height
			getShape: function() {
				return (new me.Rect(0, 0, 100, 85)).toPolygon();
			}
			//getShape function creates rectangle for enemy
		}]);
	},

	setFlags: function() {
		this.facing = 'right';
		this.flipX(true);

		this.attacking = false;
		//sets variable attacking to false
	},

	setGloopTimers: function() {
		this.lastAttacking = new Date().getTime();
		this.lastHit = new Date().getTime();
		this.now = new Date().getTime();
		//all for spacing out time in update function
	},

	setAnimation: function() {
		this.renderable.addAnimation("walk", [1, 2, 3, 4], 80);
		//creates a walk animation
	},

	collideHandler: function(response) {
		if(response.b.type === 'EnemyBaseEntity') {
			this.collideWithEnemyBase(response);
			//enemy base collisions
		} //if the creep hits player base
		else if (response.b.type === 'EnemyCreep') {
			this.collideWithEnemyCreep(response);
			//collision w/ the enemy creep
		}
		else if (response.b.type === 'JumpTrigger') {
			this.jumpTrigger(response);
			//jump trigger collision
		}	
	},

	collideWithEnemyBase: function(response) {
		this.attacking = true;
		this.lastAttacking = this.now;
		this.body.vel.x = 0;
		//stops movement
		this.pos.x = this.pos.x - 1; 
		//keeps moving creep to right to maintain its position
		if(this.now - this.lastHit >= 1000) {
			this.lastHit = this.now;
			//reset?
			response.b.loseHealth(game.data.gloopAttack); //uses global var
			//calls loseHealth function with one damage
		}
		//times out the hits
	},

	collideWithEnemyCreep: function(response) {
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
			response.b.loseHealth(game.data.gloopAttack); //uses global var
			//calls loseHealth function with one damage
		}
		//times out the hits
	},

	jumpTrigger: function(response) {
		var xdif = this.pos.x - response.b.pos.x;
		//gives the ydif a value

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
	},

});
//EnemyCreep entity to create enemy 