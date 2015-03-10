game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); 
		//added a exp screen image that needs to load

		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				//basic settings for the title screen
				this.font = new me.Font("Arial", 46, "white");
				//font used in title
			},

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);
				//draw spend exp screen
				this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x, this.pos.y + 50);
				//draw spend exp screen
				this.font.draw(renderer.getContext(), "F1: MIDAS " + game.data.exp.toString(), this.pos.x, this.pos.y + 100);
				//draw spend exp screen
				this.font.draw(renderer.getContext(), "F2: ZEPHYR " + game.data.exp.toString(), this.pos.x, this.pos.y + 150);
				//draw spend exp screen
				this.font.draw(renderer.getContext(), "F3: ARES " + game.data.exp.toString(), this.pos.x, this.pos.y + 200);
				//draw spend exp screen
				this.font.draw(renderer.getContext(), "F4: VULCAN " + game.data.exp.toString(), this.pos.x, this.pos.y + 250);
				//draw spend exp screen
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
