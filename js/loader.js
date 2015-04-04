$('#mainmenu').bind('click', function(){
	me.state.change(me.state.MENU);
});
//alert(jQuery.fn.jquery); // test if jQuery loads


//when you click main menu, links back to that menu
				
				$("#register").bind("click", function(){
					$.ajax({
						type: "POST",
						url: "php/controller/create-user.php",
						data: {
							username: $('#username').val(),
							password: $('#password').val()
						},
						dataType: "text"
					})
					.success(function(response) {
						if(response === "true") {
							me.state.change(me.state.PLAY);
						}
						else {
							alert(response);
						}
					})
					.fail(function(response) {
						alert("fail");
					});
				});
				//when you register ...
				$("#load").bind("click", function(){
					$.ajax({
						type: "POST",
						url: "php/controller/login-user.php",
						data: {
							username: $('#username').val(),
							password: $('#password').val()
						},
						dataType: "text"
					})
					.success(function(response) {
						if(response === "Invalid username and password") {
							alert(response);
						}
						else {
							var data = jQuery.parseJSON(response);
							game.data.exp = data["exp"];
							game.data.exp1 = data["exp1"];
							game.data.exp2 = data["exp2"];
							game.data.exp3 = data["exp3"];
							game.data.exp4 = data["exp4"];
							me.state.change(me.state.SPENDEXP);
						}
					})
					.fail(function(response) {
						alert("fail");
					});
				});
				//when you register ...