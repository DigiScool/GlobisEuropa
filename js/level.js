define(['jquery'],function($){

	var Level = Class.extend({

		init: function(app,engine){
			this.app = app;
			this.engine = engine;

			this.data = { 
				"11" : {
					"headline" : "",
					"bg" : {
						"url" : "gfx/big/Westeuropa.png",
						"x" : "200",
						"y" : -330 , 
						"sX" : 0.8,
						"sY" : 0.8
					},
					"puzzle" : ["gfx/little/GER.png"]
				},

				"hm" : {
					"headline" : "Hauptmenü",
					"bg" : {
						"url" : "gfx/big/mainmenue_background.png",
						"x"  : "0",
						"y"  : "0", 
						"sX" : "1",
						"sY" : "1",
					},
					"obj" : ["globi"],
					"animation" : "globi_idle",
					"buttons" :  ["button_newGame"]
				}
			};

		},

		start: function(id){
			

			
 			$('#headline').html(this.data[id].headline);
 			$('#levelLoader').addClass("fadeOut");
 			$('#levelLoader').addClass('hide');

 			$('#canvas').css("background-color", "#1b9cf7");
 			
 			// Ist ein Background definiert ?
 			var bg = this.data[id].bg;
 			if(bg){
 				this.engine.addBitmap(bg.url,bg.x,bg.y,bg.sX, bg.sY);
 			}

 			// Sind Puzzle-Teile definiert ?
 			var pzl = this.data[id].puzzle;
 			if(pzl){
 				for(var i = 0; i<pzl.length; i++){

 					this.engine.addPuzzle(pzl[i]);
 				}
 			}
 			
 			// Werden Objekt-Klassen verwendet ?
 			var oc = this.data[id].obj;
 			if(oc){
 				for(var i = 0; i<oc.length; i++){

 					this.engine.addObject(oc[i]);
 				}
 			}

 			// Ist eine Animation definiert ?
 			var anim = this.data[id].animation;
 			if(anim) this.engine.startAnimation(anim);

 			// Buttons ?
 			var bt = this.data[id].buttons;
 			if(bt){
 				for(var i = 0; i<bt.length; i++){
 					var name = '#'+bt[i];
 					$(name).removeClass('hide');
 				}
 			}
 				
		},
	});

	return Level;

});