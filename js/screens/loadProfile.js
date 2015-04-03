game.LoadProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('load-screen')), -10); 
		//added a load profile screen image that needs to load

		document.getElementById("input").style.visibility = "visible"; //makes accounts form visible
		document.getElementById("load").style.visibility = "visible"; //makes load game button visible

		me.input.unbindKey(me.input.KEY.B); //unbinds the b key
		me.input.unbindKey(me.input.KEY.Q); //unbinds the q key
		me.input.unbindKey(me.input.KEY.W); //unbinds the w key
		me.input.unbindKey(me.input.KEY.E); //unbinds the e key
		me.input.unbindKey(me.input.KEY.A); //unbinds the a key

		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				//basic settings for the title screen
				this.font = new me.Font("Arial", 26, "white");
				//font used in title
			},

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "ENTER USERNAME/PASSWORD", this.pos.x, this.pos.y);
				//text prompts user to enter in username/password
			},
			//used as main function to draw on screen
		})));
		//renderable continuing old game
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		document.getElementById("input").style.visibility = "hidden"; //hides accounts form
		document.getElementById("load").style.visibility = "hidden"; //hides load game button
	}
});