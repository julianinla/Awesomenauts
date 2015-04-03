game.NewProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10); 
		//added a new profile screen image that needs to load
		document.getElementById("input").style.visibility = "visible"; //makes input form visible
		document.getElementById("register").style.visibility = "visible"; //makes the account register button visible

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
				this.font.draw(renderer.getContext(), "PICK USERNAME/PASSWORD", this.pos.x, this.pos.y);
				//text tells user to make username/password
			},
			//used as main function to draw on screen
		})));
		//renderable starting new game
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		document.getElementById("input").style.visibility = "hidden"; //hides input form
		document.getElementById("register").style.visibility = "hidden"; //hides register button
	}
});
