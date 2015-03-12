game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); 
		//added a exp screen image that needs to load

		me.input.bindKey(me.input.KEY.F1, "F1");
		me.input.bindKey(me.input.KEY.F2, "F2");
		me.input.bindKey(me.input.KEY.F3, "F3");
		me.input.bindKey(me.input.KEY.F4, "F4");
		me.input.bindKey(me.input.KEY.F5, "F5");

		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				//basic settings for the title screen
				this.font = new me.Font("Arial", 26, "white");
				//font used in title
			},

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);
				//draw spend exp screen, gives command options
				this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x, this.pos.y + 50);
				//draws current exp text
				this.font.draw(renderer.getContext(), "F1: MIDAS CURRENT LEVEL: " + game.data.exp1.toString() + 
				" COST: " + ((game.data.exp1 + 1) * 10), this.pos.x, this.pos.y + 150);
				//draws option 1
				this.font.draw(renderer.getContext(), "F2: ZEPHYR CURRENT LEVEL: " + game.data.exp2.toString() +
				" COST: " + ((game.data.exp2 + 1) * 10), this.pos.x, this.pos.y + 200);
				//draws option 2
				this.font.draw(renderer.getContext(), "F3: ARES ", this.pos.x, this.pos.y + 250);
				//draws option 3
				this.font.draw(renderer.getContext(), "F4: VULCAN ", this.pos.x, this.pos.y + 300);
				//draws option 4
			},
			//used as main function to draw on screen
		})));
		//renderable starting new game

		this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
			if (action === "F1") {

			}
			else if (action === "F2") {

			}
			else if (action === "F3") {
				
			}
			else if (action === "F4") {
				
			}
			else if (action === "F5") {
				me.state.change(me.state.PLAY);
			}
		});
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.bindKey(me.input.KEY.F1, "F1");
		me.input.bindKey(me.input.KEY.F2, "F2");
		me.input.bindKey(me.input.KEY.F3, "F3");
		me.input.bindKey(me.input.KEY.F4, "F4");
		me.input.bindKey(me.input.KEY.F5, "F5");
		me.event.unsubscribe(this.handler);
	}
});
