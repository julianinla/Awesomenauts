game.ExperienceManager = Object.extend({
	init: function(x, y, settings) {
		this.alwaysUpdate = true;
		//makes game always update
		this.gameover = false;
		//sets gameOver to false
	},
	//initializes all vars

	update: function() {
		if (game.data.win === true && !this.gameover) {
			this.gameOver(true);
			//passes in false, tells game you won
			alert("YOU WIN!");
		}
		//if the player wins and game is over
		else if (game.data.win === false && !this.gameover) {
			this.gameOver(false);
			//passes in false, tells gmae you lost
			alert("YOU LOSE!");
		}
		//if the player loses and game is over

		return true;
	},

	gameOver: function(win) {
		if(win) {
			game.data.exp += 10;
			//gives the player 10 exp points
		} 
		//if you won game
		else {
			game.data.exp += 1;
			//gives the player 1 exp point
		}
		//if you lost
		
		this.gameover = true;
		//sets gameOver to true
		me.save.exp = game.data.exp;
		//saves your exp in melonjs

		$.ajax({
			type: "POST", //type post?
			url: "php/controller/save-user.php", //url for creating users
			data: {
				exp: game.data.exp,
				exp1: game.data.exp1,
				exp2: game.data.exp2,
				exp3: game.data.exp3,
				exp4: game.data.exp4,
			},
			//sets username and password to entered info
			dataType: "text"
		})
		.success(function(response) {
			if(response === "true") {
				me.state.change(me.state.MENU);
				//start game
			}
			else {
				alert(response);
			}
		})
		//if successful 
		.fail(function(response) {
			alert("fail");
		}); //if if fails say so
		//all this code comes from similar code in index.php
		//loads game correctly

	}
});
//ExperienceManager for player experience