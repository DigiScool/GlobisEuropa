/*
*	app.js
*	======
*	providing screen-functionality, like user inputs,
*	buttons, etc
*/


define(['jquery'],function($){
	
	var App = Class.extend({

		// Konstruktor
		init: function(){
			
			this.engine = null;
			this.level = null;
			this.FIRST_ENTRY_HM = true;
		},

		setup: function(engine,level){
			
			this.engine = engine;
			this.level = level;
		},

		setGameState: function(state,id){

			var self = this;
			
			switch(state){
				case "startup": 
					// Die Seite wurde gerade aufgerufen. 
					// Starte den Preloader
					this.preload("startup",function(){
					
						// Alle Bilder geladen
						// Initialsiere die Container
						self.engine.setHauptmenue("gfx/big/mainmenue_background.png");
						self.showStartScreen();
					});
					break;

				case "intro":
					// Intro abspielen
					console.log("Zeige Intro");
					$('#loader').addClass('hide');
					$('#button_cancelIntro').removeClass('hide');
 					$('#bubble_welcome').addClass('hide');
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
					//$("#button_newGame").removeClass('hide');
					
					// DEBUGGING
	
 				 	// Animation starten
 				 	this.engine.startAnimation("globi_idle");

 				 	if(this.FIRST_ENTRY_HM){
 				 		
 				 		this.engine.showTheProcress();
 				 		
 				 		// Das Hm ist zum ersten mal aufgerufen. Zeige den Begrüßungsdialog
  				 		$('#bubble_intro_text').removeClass('hide');
 				 		this.FIRST_ENTRY_HM = false;

 				 	} else {
 				 		this.engine.enableEvents_Hauptmenue();
 				 	}

					break;

				case "levelDone":

					// entferne alle Elemente auf der Canvas
					// leere die Ticker
					this.engine.clearStage();

					// Entferne alle Bubbles
					$('#bubbles').children().addClass('hide');

					// Entferne selektierbare Kontinente
					this.engine.disableLandSelection();

					// Lade das Hauptmenue
					this.engine.loadContainer("hmContainer");
 					
 					// setze Globi auf Position
 					this.engine.globi.y = 300;
 					this.engine.globi.x  = 650;

 					// Bring Globi zurück auf das Levelauswahlmenü
 					this.engine.startAnimation('globi_leveldone_popDown',function(){
 						
 						
 						// Zeige Fortschritt auf Gbovi
 						self.engine.showTheProcress(function(){
 							
 							var count = 0;
 						
 							for(var i= 0; i < self.level.procress.length; i++){
 								count += self.level.procress[i];
 						
 							}

 							if((count%4) == 0){
 								self.level.stage++;
 								self.level.level_played = 0;
 								console.log('Stage: ' + self.level.stage);
 								
 								
 								self.engine.startAnimation('globi_menue_popDown',function(){
 									if( self.level.stage == 2){
 										$('#bubble_intro_text').children('p').html("Prima! Die Länder Europas sind wieder alle auf der Karte zu sehen. Ohne deine Hilfe hätte ich das nie geschafft.");
 										$('#bubble_selectshape_intro').children('p').html("Toll, der Fleck auf meinem Bauch sieht nun auch nicht mehr so schlimm aus. Aber wie soll man die vielen Länder Europas nun unterscheiden? Ich bin mir sicher, die Länder hatten Flaggen. Aber welches Land hatte welche Fahne? Oje, ich bin schon wieder völlig hilflos. Aber du kannst mir doch hoffentlich helfen, oder?");
 										$('#bubble_intro_text').removeClass('hide');

 										
 									}
 									if(self.level.stage == 3){
 										$('#headline').html('');
 										$('#final').removeClass('hide');
 									}
 								}); 

 							} else {
 								console.log('Stage noch nicht geschafft [Stage: '+self.level.stage+'][Abschnitte gespielt: '+self.level.level_played+']');
 								
 								$('#bubble_selectshape_intro').children('p').html(self.level.level.ende[self.level.level_played - 1]);	
 								

 								$('#bubble_selectshape_intro').removeClass('hide');
 						
 								// ZUrück_Button des Auswahlmenües
 								$('#button_zurueck').removeClass('hide');
 								self.engine.enableLandSelection();
 							}


 							
 						});

						

					});
 					
 					break;
			}


		},

		

		// Preloader ///////////
		preload: function(id,callback){
				
			var self = this;	
			console.log("Preload: "+id);

			this.id  = id;
				
			// DIV-Setup
			$('#loader').addClass('preload');
			$('#bubble_levelloader').removeClass('hide');
			$('#headline').html('Lade...');

			$('loading_icon').addClass('loading');
			$('#levelLoader_Headline').html('Lade...');

 			
 			// Canvas bereinigen, Elemente werden erstmal nicht gebraucht
 			this.engine.clearStage();

 			// Lade die JSONFile
 			var file = 'json/' + id +'.json';
 			$.ajax({
    			url: file,
    			dataType: 'json',
    			success: function( data ) {
      				console.log("SUCCESS");
      				console.log(data);
      				loadImages(data);
   			 	},
    			error: function( data ) {
      				console.log("ERROR");
      				console.log(data);
    			}
 			 });

 			// Lade die Images
 			var imagesLoaded = 0;
 			var imagesSum;
 			var data;

 			var loadImages = function(d){

 				data = d;
 				imagesSum = data.images.length;
 				console.log("Zu ladende Teile: " + imagesSum);

 				for(var i = 0; i < data.images.length; i++){
				
					var image = new Image()
					image.src = data.images[i];
				
					image.onload = function(){
						checkComplete();	
					}
				}
 			};

 			var checkComplete = function(){
 				
 				imagesLoaded++;
 				console.log(imagesLoaded);

 				if(imagesLoaded == imagesSum){
					if(callback){
						console.log('callback');
						callback();
					} else {
 						$('loading_icon').removeClass('loading');			
 						$('#loader').addClass('hide');
 						$('#bubble_levelloader').addClass('hide');
						self.level.start(data);
					}
				}
 			};
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

			
		},
		setDOMText: function(element,html){
			$(element).html(html);
		},

		positionBubble: function(bubble,x,y){
			$(bubble).css('top' , y);
			$(bubble).css('left', x);
		},

		addBubble: function(bubble){
			$(bubble).removeClass('hide');
		},

		removeBubble: function(bubble){
			$(bubble).addClass('hide');
		},

		changeCursor: function(type){
			document.body.style.cursor = type;
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
 			// Screens
 			$('#loader').removeClass('preload');
 			$('#loader').addClass('welcome');
 			// Bubbles
 			$('#bubble_levelloader').toggleClass('hide');
 			$('#bubble_welcome').toggleClass('hide');

 			console.log('Zeige Startscreen');

 		},

 		startLevel: function(id){

 			var self = this;

 			$('#bubble_menue_newgame').removeClass('slideIn');
 			$('#bubble_menue_newgame').addClass('slideOut');
 			$('#button_zurueck').addClass('hide')
 			$('#bubble_selectshape_intro').addClass('hide');
 			this.engine.startAnimation('globi_transition_toLevel',function(){
					self.preload(id);
 			});
 		},

 		doneLevel: function(){

 			

 		},

 		toggleMenue: function(){
 			var self = this;
 			if($('#bubble_selectshape_intro').hasClass('hide')){
 				this.engine.stopAnimation('globi_idle');
 				this.engine.startAnimation('globi_menue_popUp');
 			
 				$('#bubble_selectshape_intro').removeClass('hide');
 				//$('#bubble_menue_newgame').addClass('slideIn');
 				//$('#bubble_menue_newgame').removeClass('slideOut');
 				//$('#button_newGame').addClass('hide');
 				$('#button_zurueck').removeClass('hide');

 				$('#headline').html('Neues Spiel');
 				;
 			} else {
 				$('#bubbles').children().addClass('hide');
 				this.engine.startAnimation('globi_menue_popDown',function(){
 					self.engine.startAnimation('globi_idle');
 				});
 			
 					
 				//$('#bubble_menue_newgame').addClass('slideIn');
 				//$('#bubble_menue_newgame').removeClass('slideOut');
 				//$('#button_newGame').addClass('hide');
 				$('#button_zurueck').addClass('hide');
 				this.engine.enableEvents_Hauptmenue();
 				$('#headline').html('Hauptmenü');
 				
 			}
 		},

 		showGamemenue: function(){
 			$('#bubbles').children().addClass('hide');
 			$('#button_home').addClass('hide');
 			$('#bubble_game_menue_bg').removeClass('hide');
 			$('#bubble_game_menue').removeClass('hide');
 				
 		},

 		hideGamemenue: function(){
 			$('#button_home').removeClass('hide');
 			$('#bubbles').children().addClass('hide');
 		},

 		levelDone: function(){
 			this.level.levelDone();
 		},

 		quitGame: function(){
 			var self = this;

 			$('#bubbles').children().addClass('hide');
 			$('#footBar').children().addClass('hide');
 			this.engine.clearStage();
 			this.engine.loadContainer("hmContainer");
 			this.engine.startAnimation('globi_menue_popDown',function(){
 				// Callback
 				self.setGameState("hauptmenue");
 			});
 		},

 		hideInfoText: function(){
 			$('#bubble_intro_text').addClass('hide');
 			this.engine.startAnimation("globi_idle");
 			this.engine.enableEvents_Hauptmenue();
 		}
	});

	return App

});
