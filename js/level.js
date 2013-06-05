define(['jquery'],function($){

	var Level = Class.extend({

		init: function(){
	
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
				$('#dialog').html(self.level.script.start);
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
				$('#button_home').addClass('hide');
				this.app.setGameState("levelDone",this.id);
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
		}
	});

	return Level;

});