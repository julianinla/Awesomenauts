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

		this.renderable.addAnimation("idle", [78]);
		//setting an idle image
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		//creating a walk animation using orcSpear img

		this.renderable.setCurrentAnimation("idle");
		//sets current animation to the idle
	},

	update: function(delta) {
		if(me.input.isKeyPressed("right")) {
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//current postion changes by setVelocity() 
			//me.timer.tick keeps movement smooth
			this.flipX(true);
			//flips the animation for right movement
		}
		else if(me.input.isKeyPressed("left")) {
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			//current postion changes by setVelocity() 
			//me.timer.tick keeps movement smooth
			this.flipX(false);
			//stops animation from flipping to right when moving left
		}
		else {
			this.body.vel.x = 0;
			//if not pressing, no change in velocity
		}

		if(this.body.vel.x !== 0){
			if(!this.renderable.isCurrentAnimation("walk")) {
				this.renderable.setCurrentAnimation("walk");
				//makes walk animation occur when moving
				//does so if not already walk animation
			}
		} 
		//adds if statement for movement
		else {
			this.renderable.setCurrentAnimation("idle");
			//makes sure to switch back to idle animation
		}

		this.body.update(delta);
		//lets game know to update screen

		this._super(me.Entity, "update", [delta]);
		//updates in real time

		return true;
	}
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
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
			//getShape function for use
		}]); 
		//build constructor by calling super

		this.broken = false; //tower not destroyed
		this.health = 10; //health of the tower
		this.alwaysUpdate = true; //update if not on screen 
		this.body.onCollision = this.onCollision.bind(this); //able to collide w/ tower

		this.type = "PlayerBaseEntity"; //later for other collisions

		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");
	}, 
	//init function for initialize

	update: function(delta) {
		if(this.health <= 0) {
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		//if health <= 0 then tower broken 
		this.body.update(delta); //update for this

		this._super(me.Entity, "update", [delta]); //have to call super
		return true;
	},
	//update function to update

	onCollision: function() {
		//empty onCollision function for later
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
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
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
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");
	}, 
	//init function for initialize

	update: function(delta) {
		if(this.health <= 0) {
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		//if health <= 0 then tower broken 
		this.body.update(delta); //update for this

		this._super(me.Entity, "update", [delta]); //have to call super
		return true;
	},
	//update function to update

	onCollision: function() {
		//empty onCollision function for later
	}
}); 
//base entity similar to player