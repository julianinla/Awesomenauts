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
				//handles being able to click on start
			},

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);
				//draw new game start
			},
			//used as main function to draw on screen

			update: function(dt) {
				return true;
			},

			newGame: function() {
				me.input.releasePointerEvent('pointerdown', this);
				//gets rid of pointerfunction
				me.save.remove('exp');
				me.save.remove('exp1');
				me.save.remove('exp2');
				me.save.remove('exp3');
				me.save.remove('exp4');
				//removes all these vars from game when start new
				me.state.change(me.state.PLAY);
				//starts the game
			}
		})));
		//renderable starting new game

		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [380, 340, 300, 50]);
				//basic settings for the title screen, diff position from start
				this.font = new me.Font("Arial", 46, "white");
				//font used in title
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
				//handles being able to click on start
			},

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);
				//draw continue start button
			},
			//used as main function to draw on screen

			update: function(dt) {
				return true;
			},

			newGame: function() {
				game.data.exp = me.save.exp;
				game.data.exp1 = me.save.exp1;
				game.data.exp2 = me.save.exp2;
				game.data.exp3 = me.save.exp3;
				game.data.exp4 = me.save.exp4;

				me.input.releasePointerEvent('pointerdown', this);
				//gets rid of pointerfunction
				me.state.change(me.state.PLAY);
				//starts the game
			}
		})));
		//renderable for continuing game

	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});
