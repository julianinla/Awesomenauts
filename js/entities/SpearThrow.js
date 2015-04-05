game.SpearThrow = me.Entity.extend({
	init: function(x, y, settings, facing) {
		this.setSuper(x, y, settings);
		//holds super animation for the spear

		this.alwaysUpdate = true;
		//makes always update

		this.facing = facing;
		//sets facing to direction player is facing

		this.body.setVelocity(8, 0);
		//sets the movement velocity of spear

		this.attack = game.data.ability3 * 3;
		//changes damage based on level of ability

		this.type = "spear";
		//gives entity a type
	},


	setSuper: function(x, y, settings) {
			this._super(me.Entity, 'init', [x, y, {
				image: "spear", //gives image to spear
				width: 48, //sets width to 32
				height: 48, //sets height to 64
				spritewidth: "48", //same as width
				spriteheight: "48", //same as height
				getShape: function() {
					return (new me.Rect(0, 0, 48, 48)).toPolygon();
				}
				//getShape function creates rectangle for spear
			}]);
		},

	update: function(delta) {
		if(this.facing === 'left') {
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			//causes spear to move left
		}
		//if player is facing left
		else {
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//causes spear to move right
		}

		me.collision.check(this, true, this.collideHandler.bind(this), true);
		//allows for spear collisions

		this.body.update(delta);
		//update makes this happen in real time

		this._super(me.Entity, "update", [delta]);
		//updates the entity

		return true;
	},

	collideHandler: function(response) {
		if(response.b.type === 'EnemyBase' || response.b.type === 'EnemyCreep') {
			this.response.b.loseHealth(this.attack);
			//collisions cause damage
			me.game.world.removeChild(this);
		} //if the spear hits enemy base or creep	
	},

});