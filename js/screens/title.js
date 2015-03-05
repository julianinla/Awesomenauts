game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); 
		//added a title screen image that needs to load

		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				//basic settings for the title screen
				this.font = new me.Font("Arial", 46, "white");
				//font used in title
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "Awesomenauts!", 325, 130);
				this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);
				//draw a awesomenauts title
			},
			//used as main function to draw on screen

			update: function(dt) {
				return true;
			},

			newGame: function() {
				me.input.releasePointerEvent('pointerdown', this);
				me.save.remove('exp');
				me.save.remove('exp1');
				me.save.remove('exp2');
				me.save.remove('exp3');
				me.save.remove('exp4');
				me.state.change(me.state.PLAY);
			}
		})));
		//generic renderable

	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});
