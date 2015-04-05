game.MiniMap = me.Entity.extend({
	init: function(x, y, settings) {
		this._super(me.Entity, "init", [x, y, (
			image: "minimap",
			width: 384,
			height: 122,
			spritewidth: "384",
			spriteheight: "122",
			getShape: function() {
				return (new me.Rect(0, 0, 384, 122)).toPolygon();
			}
		)]);

		this.floating = true;
	}
});
//basic entity setup for minimap