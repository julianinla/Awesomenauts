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
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);

		this.renderable.setCurrentAnimation("idle");
	},

	update: function(delta) {
		if(me.input.isKeyPressed("right")) {
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//current postion changes by setVelocity() 
			//me.timer.tick keeps movement smooth
			this.flipX(true);
		}
		else if(me.input.isKeyPressed("left")) {
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			//current postion changes by setVelocity() 
			//me.timer.tick keeps movement smooth
			this.flipX(false);
		}
		else {
			this.body.vel.x = 0;
			//if not pressing, no change in velocity
		}

		if(this.body.vel.x !== 0){
			if(!this.renderable.isCurrentAnimation("walk")) {
				this.renderable.setCurrentAnimation("walk");
			}
		}
		else {
			this.renderable.setCurrentAnimation("idle");
		}

		this.body.update(delta);
		//lets game know to update screen

		this._super(me.Entity, "update", [delta]);
		return true;
	}
});
//create player entity for use in game