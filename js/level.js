define(['jquery'],function($){

	var Level = Class.extend({

		init: function(){
			
			// Array zum speichern des Fortschrittes
			this.procress = new Array(4);
			this.procress[0] = 0;	// Westeuropa
			this.procress[1] = 0;	// Osteuropa
			this.procress[2] = 0;	// Südeuropa
			this.procress[3] = 0;	// Nordeuropa

			// aktueller Abschnitt
			this.stage = 2;

			// counter für Scripte
			this.level_played = 0;

		},

		setup: function(app,engine){
			
			this.app = app;
			this.engine = engine;
	
		},


		start: function(data){

			var self = this;

			this.level = data;

			// count the placed puzzleparts
			this.pCounter = 0;

			// Clear den Screen
			this.engine.clearStage();

			// Kleine DebugAusgabe
			console.log('Try to Start:' + this.level.headline);	

			// Ueberschrift anzeigen
			$('#headline').html(this.level.headline);

			// Buttons vorbereiten
			$('#button_hidedialog').click(function(){
				self.startLevel();
			});
			$('#button_home').removeClass('hide');
			
			// Container vorbereiten
			this.engine.setLevel(data,data.puzzle,function(){
				
				console.log("Starte Levelscript");	
				// Nachdem das Level geladen & angezeigt ist,
				// starte Script
				//self.engine.blurStage(true);
				
				$('#dialog').html(self.level.script[self.level_played]);

				$('#bubble_game_dialog').removeClass('hide');
			});

 			
 				
		},
		startLevel: function(){
			$('#bubble_game_dialog').addClass('hide');
			//this.engine.blurStage(false);
			this.engine.loadContainer('levelContainer');
		},

		showInfo: function(cId){
			var self = this;

			this.pCounter++;

			console.log('#'+this.pCounter+' richtig plaziert');
			if(this.pCounter == this.level.count) {
				self.levelDone();
			}

			if(this.id == "11" && this.pCounter == 1){
				$('#bubble_info_box').children('p').html("Sehr gut! Du hast dein erstes Puzzle-Teil"
					+ "richtig plaziert. Wenn du mehr über das Land wissen möchtest, klicke auf"
					+ "die Glühbirne rechts unten in der Ecke");

				$('#bubble_info_icon').removeClass('hide');
				$('#bubble_info_icon').click(function(){
				
					$('#bubble_info_box').removeClass('hide');
					$('#bubble_info_icon').addClass('hide');
					$('#bubble_info_icon').unbind();
				});

				$('#button_hide_infobox').click(function(){
					
					$('#bubble_info_box').addClass('hide');
					$('#bubble_hide_infobox').unbind();
				});
			}
		},

		loadInfo: function(country){
			console.log("COUNTRY-ID. " + country);
			if(this.level.puzzle[country]){
				var facts = this.level.puzzle[country].facts.join('');	
				var description = this.level.puzzle[country].description.join(' ');
				this.app.setDOMText("#country_info_text",facts);
				this.app.setDOMText("#bubble_country_details",description);
				this.app.addBubble("#bubble_country_info");
			}
			
			
		},

		levelDone: function(){

			// das Spiel wurde geschafft. 
			// entsprechendes Array-Feld wird um 1 erhöht
			this.procress[this.level.id]++;
			this.level_played++;

			// Sind alle Abschnitte gespielt wurden ?
			var count = 0;
			for(var i = 0; i < this.procress.length; i++){
				if(this.procress[i] == this.stage) count++;
			}

			if(count == 4){
				// Alle Abschnitt haben die aktuelle Sage geschafft
				this.stage++;
			}

			$('#button_home').addClass('hide');
			this.app.setGameState("levelDone");
		}
	});

	

	return Level;

});