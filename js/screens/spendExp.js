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
				this.font.draw(renderer.getContext(), "PRESS 1-4 TO BUY, 5 TO SKIP", this.pos.x, this.pos.y);
				//draw spend exp screen, gives command options
				this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x, this.pos.y + 50);
				//draws current exp text
				this.font.draw(renderer.getContext(), "1: MIDAS " + game.data.exp.toString(), this.pos.x, this.pos.y + 100);
				//draws option 1
				this.font.draw(renderer.getContext(), "2: ZEPHYR " + game.data.exp.toString(), this.pos.x, this.pos.y + 150);
				//draws option 2
				this.font.draw(renderer.getContext(), "3: ARES " + game.data.exp.toString(), this.pos.x, this.pos.y + 200);
				//draws option 3
				this.font.draw(renderer.getContext(), "4: VULCAN " + game.data.exp.toString(), this.pos.x, this.pos.y + 250);
				//draws option 4
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
