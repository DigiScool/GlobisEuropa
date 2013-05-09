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
				"hauptmenue" : {
					"id"   : "hm",
					"headline": "Hauptmenü",
					"images" : [ "gfx/big/mainmenue_background.png"],
				},

				"level11" : {
					"id" : "11",
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

		setup: function(engine,css){
			
			this.engine = engine;
			this.level = new Level(this,engine)
		},

		startSzene: function(name,id){

			switch(name){

				// Direktes Ausführen des Hauptmenüs noch möglich
				// Später soll das auch über den Loader geschehen, um eine 
				// Einheitliche Schnittstelle zu haben
				case 'hauptmenue': 
					
					this.szene = new Hauptmenue(this,this.engine, this.css);
					

					
					this.szene.startSzene();
					break;
			}
		},

		// Preloader ///////////
		loadSzene: function(id){
						
			this.id  = id;
				
			// DIV-Setup
			$('loading_icon').addClass('loading');
			$('#levelLoader').removeClass('hide');
			$('#headline').html('Lade Level');
			$('#levelLoader_Headline').html(this.data[id].headline);

 			
 			// Canvas bereinigen, Elemente werden erstmal nicht gebraucht
 			this.engine.clearStage();

 			this.loadImages();
		},

		// Läd eine Anzahl von Bildern
		// Wenn ein Bild fertig geladen ist, ruft es einen Callback auf
		loadImages: function(){

			this.imagesLoaded = 0;
			var self = this;

			for(var i = 0; i < this.data[this.id].images.length; i++){
				
				var image = new Image()
				image.src = this.data[this.id].images[i];
				
				image.onload = function(){
					self.loadCallback();
				}
			}
		},

		// Zählt die geladenen Bilder. Erstellt den Ladebalken
		// Wenn alle Bilder geladen -> read()
		loadCallback: function(){
			
			//  Counter erhöhen
			this.imagesLoaded++;

			// Balken neu berechnen
			var breite = Math.round(( this.imagesLoaded * 100) / this.data[this.id].images.length);
			var text = breite+"%";
			$('#levelLoader_process').width(text);

			// Schauen ob alles geladen ist
			if(this.imagesLoaded == this.data[this.id].images.length){
				this.ready();
			}
		},

 		ready: function(){
 			console.log('Try to start Level '+ this.data[this.id].id);
 			this.level.start(this.data[this.id].id);
 		},

 		startLevel: function(id){

 			var self = this;

 			$('#menue').removeClass('slideIn');
 			$('#menue').addClass('slideOut');
 			$('#button_zurueck').addClass('hide');
 			this.engine.startAnimation('globi_transition_toLevel',function(){
					self.loadSzene(id);
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
 				this.engine.disableEvents('globiContainer');
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
 			this.app.loadSzene('hauptmenue');
 			this.engine.startAnimation('globi_menue_popDown');;
 			$('#button_newGame').removeClass('hide');
 			$('#button_home').addClass('hide')
 			$('#levelLoader').addClass('hide');
 			$('#headline').html('Hauptmen&uuml;');
 		}
	});

	return App

});
