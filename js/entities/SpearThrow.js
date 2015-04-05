game.SpearThrow = me.Entity.extend({
	init: function(x, y, settings, facing) {
		this.setSuper(x, y, settings);
		//holds super animation for the creep

		this.alwaysUpdate = true;
		//makes always update

		this.facing = facing;

		this.body.setVelocity(8, 0);
		//sets the movement velocity of EnemyCreep

		this.attack = game.data.ability3 * 3;

		this.type = "spear";
		//gives entity a type
	},


	setSuper: function(x, y, settings) {
			this._super(me.Entity, 'init', [x, y, {
				image: "spear", //gives enemy image to creep1
				width: 48, //sets width to 32
				height: 48, //sets height to 64
				spritewidth: "48", //same as width
				spriteheight: "48", //same as height
				getShape: function() {
					return (new me.Rect(0, 0, 48, 48)).toPolygon();
				}
				//getShape function creates rectangle for enemy
			}]);
		},

	update: function(delta) {
		if(this.facing === 'left') {
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			//causes creep to move
		}
		else {
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//causes creep to move
		}

		me.collision.check(this, true, this.collideHandler.bind(this), true);
		//allows for creep collisions

		this.body.update(delta);
		//update makes this happen in real time

		this._super(me.Entity, "update", [delta]);
		//updates the entity
		return true;
	},

	collideHandler: function(response) {
		if(response.b.type === 'EnemyBase' || response.b.type === 'EnemyCreep') {
			this.response.b.loseHealth(this.attack);
			//collisions for player base
			me.game.world.removeChild(this);
		} //if the creep hits player base	
	},

});