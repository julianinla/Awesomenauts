game.MiniPlayerLocation = me.Entity.extend({
	init: function(x, y, settings) {
		this.settings = settings; //makes settings settings?
		this.r = 5; //radius is 5
		this.diameter = (this.r + 2) * 2;  //says diameter of miniplayer icon
		this.anchorPoint = new me.Vector2d(0, 0); //tells miniplayer where to start
		this.loc = x, y; //tells location of miniplayer
		this.settings.width = this.diameter; //makes height same as diameter
		this.settings.height = this.diameter; //makes width same as diameter
		this.settings.spritewidth = this.diameter; //same as widht
		this.settings.spriteheight = this.diameter;	//same as height
		this.floating = true; //causes minplayer to move w/ minimap
		this.image = me.video.createCanvas(this.settings.width, this.settings.height); //create canvas?

		var ctx = me.video.renderer.getContext2d(this.image); //renders the image?

		ctx.fillStyle = "rgba(0, 156, 26, 0.75)"; //makes inner stroke green
		ctx.strokeStyle = "black";	//makes outer stroke black
		ctx.lineWidth = 2; //makes thickness 2

		ctx.arc(this.r + 2, this.r + 2, this.r, 0, Math.PI * 2); //makes the arc of the circle
		ctx.fill();	//fill function?
		ctx.stroke(); //stroke function?

		var my = this; //unused rn
		this._super(me.Entity, "init", [x, y, {
			width: 14, //makes width 14
			height: 14,	//makes height 14
			spritewidth: "14",	//same as width
			spriteheight: "14", //same as height
			getShape: function() {
				return(new me.Rect(0, 0, 14, 14)).toPolygon();
			}
			//makes rectangle to appear in
		}]);
		//super class for appearance of entity
	},
	//function that initializes miniplayer

	draw: function(renderer) {
		this._super(me.Entity, "draw", [renderer]); //super class renderer?
		this.floating = true; //again makes it float on screen 
		renderer.drawImage(
			this.image,
			0, 0, this.width, this.height,
			this.pos.x, this.pos.y, this.width, this.height
		); //complicated way to draw the image
	},
	//draw function rather than image

	update: function() {
		this.pos.x = (10 + (game.data.player.pos.x * 0.11)); //says what x value should be
		this.pos.y = (10 + (game.data.player.pos.y * 0.105)); //says what y value should be
		return true;
	}
});