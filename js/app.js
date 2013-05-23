/*
*	app.js
*	======
*	providing screen-functionality, like user inputs,
*	buttons, etc
*/


define(['level','jquery'],function(Level,$){
	
	var App = Class.extend({

		// Konstruktor
		init: function(){
			
			this.engine = null;
			this.level = null;

			
				

			// JSON-Data für den Preloader. 
			// Was soll vor dem Start einer Szene geladen werden
			this.data = {
				"startup" : {
					"followUp" : "hm",
					"headline" : "Initialisiere das Spiel",
					"images" : [ 
						"gfx/big/mainmenue_background.png",
						"gfx/big/Globi_Vektor.png",
						"gfx/big/story_1.jpg",
						"gfx/big/story_2.jpg"
					]
				},

				"level11" : {
					"followUp" : "11",
					"headline": "Westeuropa :  Puzzlespiel 1",
					"images" : [
						"gfx/big/Westeuropa.png",
						"gfx/big/Osteuropa.png",
						"gfx/big/Nordeuropa.png",
						"gfx/little/AUS.png","gfx/little/BEL.png","gfx/little/FRA.png",
						"gfx/little/GER.png","gfx/little/HOL.png","gfx/little/LUX.png",
						"gfx/little/HOL.png","gfx/little/HUN.png","gfx/little/LIT.png",
						"gfx/little/SUI.png","gfx/little/ROM.png","gfx/little/UK.png",
						"gfx/little/Portugal.png","gfx/little/Spanien.png","gfx/little/SUI.png"
					]	
				}	
			};

		},

		setup: function(engine){
			
			this.engine = engine;
			this.level = new Level(this,engine)
		},

		setGameState: function(state){

			var self = this;
			
			switch(state){
				case "startup": 
					// Die Seite wurde gerade aufgerufen. 
					// Starte den Preloader
					this.preload("startup",function(){
					
						// Alle Bilder geladen
						// Initialsiere die Container
						self.engine.setHauptmenue(self.data.startup.images[0]);
						self.showStartScreen();
					});
					break;

				case "intro":
					// Intro abspielen
					console.log("Zeige Intro");
					$('#startScreen').addClass('hide');
					$('#button_cancelIntro').removeClass('hide');
 					$('#button_startGame').addClass('hide');
 					$('#canvas').removeClass('hide');
					this.engine.showIntro(function(){
						
						//callback, wenn fertig
						self.engine.clearStage();
						// Container laden
						self.engine.loadContainer("hmContainer");
						
						$('#button_cancelIntro').addClass('hide');
						self.setGameState("hauptmenue");
					
					});
					break;
				
				case "hauptmenue":
					
					// Hauptmenue
					$('#headline').html('Hauptmen&uuml;');
					$("#button_newGame").removeClass('hide');
					
 				 	// Animation starten
 				 	this.engine.startAnimation("globi_idle");
					break;
			}
			

		},

		

		// Preloader ///////////
		preload: function(id,callback){
				
			console.log("Preload: "+id);

			this.id  = id;
				
			// DIV-Setup

			$('loading_icon').addClass('loading');
			$('#levelLoader').removeClass('hide');
			$('#headline').html('Lade...');
			$('#levelLoader_Headline').html(this.data[id].headline);

 			
 			// Canvas bereinigen, Elemente werden erstmal nicht gebraucht
 			this.engine.clearStage();

 			this.imagesLoaded = 0;
			var self = this;

			for(var i = 0; i < this.data[this.id].images.length; i++){
				
				var image = new Image()
				image.src = this.data[this.id].images[i];
				
				image.onload = function(){
					self.loadCallback(callback);
				}
			}
		},

		// Zählt die geladenen Bilder. Erstellt den Ladebalken
		// Wenn alle Bilder geladen -> read()
		loadCallback: function(callback){
			
			//  Counter erhöhen
			this.imagesLoaded++;

			// Balken neu berechnen
			var breite = Math.round(( this.imagesLoaded * 100) / this.data[this.id].images.length);
			var text = breite+"%";
			$('#levelLoader_process').width(text);

			// Schauen ob alles geladen ist
			if(this.imagesLoaded == this.data[this.id].images.length){
				if(callback){
					callback();
				} else {
					console.log('babunm');
					$('#headline').html(this.data[this.id].headine);
 					$('loading_icon').removeClass('loading');			
 					$('#levelLoader').addClass('hide');
					this.level.start(this.data[this.id].followUp);
				}
			}
		},


 		//////////////////////////////
 		// Button- Binding -Funktionen
 		cancelIntro: function(){
 			this.engine.cancelIntro();
 		},

 		showStartScreen: function(){
 			// Level ist fertig geladen. Entferne den Load-Screen
 			$('#headline').html("");
 			$('loading_icon').removeClass('loading');			
 			$('#levelLoader').addClass('hide');
 			$('#startScreen').removeClass('hide');
 			$('#button_startGame').removeClass('hide');
 			$('#canvas').addClass('hide');

 			console.log('Zeige Startscreen');

 		},

 		startLevel: function(id){

 			var self = this;

 			$('#menue').removeClass('slideIn');
 			$('#menue').addClass('slideOut');
 			$('#button_zurueck').addClass('hide');
 			this.engine.startAnimation('globi_transition_toLevel',function(){
					self.preload("level11");
 			});
 		},

 		toggleMenue: function(){
 			if($('#menue').hasClass('slideIn')){
 				this.engine.startAnimation('globi_menue_popDown');
 				$('#menue').removeClass('slideIn');
 				$('#menue').addClass('slideOut');
 				$('#button_newGame').removeClass('hide');
 				$('#button_zurueck').addClass('hide')
 				$('#headline').html('Hauptmen&uuml;');
 			} else {
 				this.engine.stopAnimation('globi_idle');
 				this.engine.startAnimation('globi_menue_popUp');

 				$('#menue').addClass('slideIn');
 				$('#menue').removeClass('slideOut');
 				$('#button_newGame').addClass('hide');
 				$('#button_zurueck').removeClass('hide');
 				$('#headline').html('Neues Spiel');
 			}
 		},

 		showGamemenue: function(){

 			var self = this;

 			$('#button_newGame').removeClass('hide');
 			$('#button_home').addClass('hide')
 			$('#levelLoader').addClass('hide');
 			$('#headline').html('Hauptmen&uuml;');
 			$('#level_puzzle_menueHoverArea').addClass('hide');
 			this.engine.clearStage();
 			this.engine.loadContainer("hmContainer");
 			this.engine.startAnimation('globi_menue_popDown',function(){
 				// Callback
 				self.setGameState("hauptmenue");
 			});
 			
 			
 		}
	});

	return App

});
