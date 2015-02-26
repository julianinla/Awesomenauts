game.JumpTrigger = me.Entity.extend({
	init : function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			width: 64, //sets width to 32
			height: 32, //sets height to 64
			spritewidth: "64", //same as width
			spriteheight: "32", //same as height
			getShape: function() {
				return (new me.Rect(0, 0, 64, 32)).toPolygon();
			}
			//getShape function creates rectangle for enemy
		}]);

		// console.log("hello");

		this.type = "JumpTrigger";
		//sets type to jumptrigger

		this.alwaysUpdate = true; //update if not on screen 
		// this.body.onCollision = this.onCollision.bind(this);
	},

	update: function(delta) {
		this.body.update(delta); //update for this

		this._super(me.Entity, "update", [delta]); //have to call super
		return true;
	},
});