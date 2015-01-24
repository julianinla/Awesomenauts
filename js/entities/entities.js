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

		this.body.setVelocity(5, 0);
	},

	update: function(delta) {
		if(me.input.isKeyPressed("right")) {
			this.body.vel.x += this.body.accel.x * me.timer.tick;
		}
		else {
			this.body.vel.x = 0;
		}

		this.body.update(delta);
		return true;
	}
});
//create player entity for use in game