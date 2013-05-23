define(['jquery'],function($){

	var Level = Class.extend({

		init: function(app,engine){
			this.app = app;
			this.engine = engine;

			this.data = { 
				"11" : {
					"headline" : "Westeuropa Level 1",
					"bg" : "gfx/big/Westeuropa.png",
					"puzzle" : [
						{
							"id": "0" , 
						 	"menue" : "gfx/puzzle_menue/menue_ger.png",
						 	"part"	 : "gfx/little/GER.png",
						 	"hit" : {
						 		"x" : "630",
						 		"y" : "80",
						 		"w" : "120",
						 		"h" : "160"
						 	},
						 	"position": {
						 		"x" : "599",
						 		"y" : "40"
						 	},
						 	"country" : "Deutschland"
						},
						{
							"id": "1" , 
						 	"menue" : "gfx/puzzle_menue/menue_fra.png",
						 	"part"	 : "gfx/little/FRA.png",
						 	"hit" : {
						 		"x" : "440",
						 		"y" : "190",
						 		"w" : "140",
						 		"h" : "160"
						 	},
						 	"position": {
						 		"x" : "380",
						 		"y" : "142"
						 	},
						 	"country" : "Frankreich"
						}
					],
					"buttons" :  ["button_home"]
				}
			};

		},

		start: function(id){

			var self = this;

			// Clear den Screen
			this.engine.clearStage();

			// Kleine DebugAusgabe
			console.log('Try to Start:' + id);	

			// Ueberschrift anzeigen
			$('#headline').html(this.data[id].headline);


			// Container vorbereiten
			this.engine.setLevel(this.data[id].bg,this.data[id].puzzle);
			this.engine.loadContainer("levelContainer");

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