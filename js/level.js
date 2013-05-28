define(['jquery'],function($){

	var Level = Class.extend({

		init: function(app,engine){
			this.app = app;
			this.engine = engine;

			this.data = { 
				"11" : {
					"headline" : "Westeuropa Level 1",
					"bg" : "gfx/big/Westeuropa.png",
					"script": {
						"start":"Wenn du weißt, wo sich ein Land befindet, ziehe einfach das Puzzle-Teil an die richtige Stelle auf der Karte. Bleibt das Teil auf der Karte hängen, war deine Idee richtig. Sonst versuchst du es einfach noch einmal, dann schaffst du es bestimmt."
					},
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
				}
			};

		},

		start: function(id){

			var self = this;
			this.level = this.data[id];

			// Clear den Screen
			this.engine.clearStage();

			// Kleine DebugAusgabe
			console.log('Try to Start:' + this.level.headlines);	

			// Ueberschrift anzeigen
			$('#headline').html(this.level.headline);

			// Buttons vorbereiten
			$('#button_hidedialog').click(function(){
				self.startLevel();
			});
			$('#button_home').removeClass('hide');
			
			// Container vorbereiten
			this.engine.setLevel(this.level.bg,this.level.puzzle,function(){
				console.log("Starte Levelscript");	
				// Nachdem das Level geladen & angezeigt ist,
				// starte Script
				self.engine.blurStage(true);
				$('#dialog').html(self.level.script.start);
				$('#bubble_game_dialog').removeClass('hide');
			});

 			
 				
		},
		startLevel: function(){
			$('#bubble_game_dialog').addClass('hide');
			this.engine.blurStage(false);
			this.engine.loadContainer('levelContainer');
		}
	});

	return Level;

});