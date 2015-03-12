game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); 
		//added a exp screen image that needs to load

		me.input.bindKey(me.input.KEY.F1, "F1"); //initializes f1 key
		me.input.bindKey(me.input.KEY.F2, "F2"); //initializes f2 key
		me.input.bindKey(me.input.KEY.F3, "F3"); //initializes f3 key
		me.input.bindKey(me.input.KEY.F5, "F5"); //initializes f5 key
		var exp1cost = ((game.data.exp1 + 1) * 10);
		var exp2cost = ((game.data.exp2 + 1) * 10);
		var exp3cost = ((game.data.exp3 + 1) * 10);

		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				//basic settings for the title screen
				this.font = new me.Font("Arial", 26, "white");
				//font used in title
			},

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "PRESS F1-F3 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);
				//draw spend exp screen, gives command options
				this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x, this.pos.y + 50);
				//draws current exp text
				this.font.draw(renderer.getContext(), "F1: MIDAS CURRENT LEVEL: " + game.data.exp1.toString() + 
				" COST: " + exp1cost, this.pos.x, this.pos.y + 150);
				//draws option 1, midas ability if have enough
				this.font.draw(renderer.getContext(), "F2: ZEPHYR CURRENT LEVEL: " + game.data.exp2.toString() +
				" COST: " + exp2cost, this.pos.x, this.pos.y + 200);
				//draws option 2, , zephyr ability if have enough
				this.font.draw(renderer.getContext(), "F3: ARES CURRENT LEVEL: " + game.data.exp3.toString() +
				" COST: " + exp3cost, this.pos.x, this.pos.y + 250);
				//draws option 3, have to finish ...
			},
			//used as main function to draw on screen
		})));
		//renderable starting new game

		this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
			if (action === "F1") {
				if(game.data.exp >= exp1cost) {
					game.data.exp1 += 1;
					game.data.exp -= exp1cost;
					me.state.change(me.state.PLAY);
				}
			}
			//if you press f1
			else if (action === "F2") {
				if(game.data.exp >= exp2cost) {
					game.data.exp2 += 1;
					game.data.exp -= exp2cost;
					me.state.change(me.state.PLAY);
				}
			}
			//if you press f2
			else if (action === "F3") {
				if(game.data.exp >= exp2cost) {
					game.data.exp2 += 1;
					game.data.exp -= exp2cost;
					me.state.change(me.state.PLAY);
				}
			}
			//if you press f3
			else if (action === "F5") {
				me.state.change(me.state.PLAY);
				//causes game to load, skips exp screen
			}
			//if you press f1
		});
		//event handler for pressing the f keys
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.bindKey(me.input.KEY.F1, "F1"); //gets rid of key bind
		me.input.bindKey(me.input.KEY.F2, "F2"); //gets rid of key bind
		me.input.bindKey(me.input.KEY.F3, "F3"); //gets rid of key bind
		me.input.bindKey(me.input.KEY.F5, "F5"); //gets rid of key bind
		me.event.unsubscribe(this.handler);
		//unsubscribes from event handler, getting rid of it
	}
});
