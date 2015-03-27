game.LoadProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('load-screen')), -10); 
		//added a exp screen image that needs to load

		me.input.unbindKey(me.input.KEY.B); //initializes f1 key
		me.input.unbindKey(me.input.KEY.Q); //initializes f2 key
		me.input.unbindKey(me.input.KEY.W); //initializes f3 key
		me.input.unbindKey(me.input.KEY.E); //initializes f5 key
		me.input.unbindKey(me.input.KEY.A); //initializes f5 key

		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				//basic settings for the title screen
				this.font = new me.Font("Arial", 26, "white");
				//font used in title
			},

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "ENTER USERNAME/PASSWORD", this.pos.x, this.pos.y);
				//draw spend exp screen, gives command options
			},
			//used as main function to draw on screen
		})));
		//renderable starting new game
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	}
});