game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); 
		//added a title screen image that needs to load

		me.input.bindKey(me.input.KEY.ENTER, "start");
		//binding key so can go to playscreen from title screen

		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [510, 30, me.game.viewport.width, me.game.viewport.height]);
				//basic settings for the title screen
				this.font = new me.Font("Arial", 46, "white");
				//font used in title
			},

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "Awesomenauts!", 325, 130);
				//draw a awesomenauts title
				this.font.draw(renderer.getContext(), "Press ENTER to Play!", 250, 530);
				//draw a queue for starting game
			}
			//used as main function to draw on screen
		})));
		//generic renderable

		this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
			if(action === "start") {
				me.state.change(me.state.PLAY);
				//go to the playscreen
			}
			//if enter key setup is pressed
		});
		//event handler for pressing enter key

	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.event.unsubscribe(this.handler);
	}
});
