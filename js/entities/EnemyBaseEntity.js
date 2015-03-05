game.EnemyBaseEntity = me.Entity.extend({
	init: function(x, y, settings) {
		this.setSuper(x, y, settings);
		//super class for enemy base

		this.broken = false; //tower not destroyed
		this.health = game.data.enemyBaseHealth; //health of the tower, based on global var
		this.alwaysUpdate = true; //update if not on screen 
		this.body.onCollision = this.onCollision.bind(this); //able to collide w/ tower

		this.type = "EnemyBaseEntity"; //later for other collisions

		this.setAnimations();
		//contains the animations
		this.renderable.setCurrentAnimation("idle");
		//sets the current animation to idle
	}, 
	//init function for initialize

	setSuper: function(x, y, settings) {
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
	},

	setAnimations: function() {
		this.renderable.addAnimation("idle", [0]);
		//add animation for unbroken tower
		this.renderable.addAnimation("broken", [1]);
		//add animation for broken tower
	},

	update: function(delta) {
		if(this.health <= 0) {
			this.broken = true; //breaks the tower
			game.data.win = true;
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
		//subtacts health
	}
}); 
//base entity similar to player