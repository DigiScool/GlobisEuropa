/*
*	Spielt Animationen ab. 
*	Fügt Objekte der Stage hinzu
*	Arbeitet nur mit der Canvas. Keine CSS-Animationen,  etc.
*/


define(['globi','lib/easeljs-0.6.0.min'],function(Globi){
	
	var Engine = Class.extend({
		
		init: function(stage){
			
			this.stage = stage;
			this.stage.enableMouseOver();

			// Objekte
			// Hintergrund
			this.bg = new createjs.Bitmap('gfx/big/mainmenue_background.png');

			// Globi
			this.globi = new Globi();
			this.globiContainer = this.globi.getContainer();


			// Speicher für die laufende Animationen
			this.anim = new Array();
			/////////////////////////


			// Variablen für die Animationen
			this.idle_globi = 1;
		
		},

		// Callback -Funktion für die Frameloop
		// Zeigt die Animation an, die im Array anim gespeichert ist
		tick: function(){
			if(this.anim[0]) { 
				
				// Rufe Funktion auf und übergib Callback
				this[this.anim[0][0]](this.anim[0][1]) };
				this.stage.update();
		},

		// Säubere die Pinnwand, wenn nichts animiert / angezeigt
		// werden muss
		// Performance Verbesserung
		clearStage: function(){
			console.log('Säubere die Stage');
			this.stage.clear();
			this.stage.removeAllChildren();
		},

		// Fügt eine Animation der anim-Liste hinzu
		startAnimation: function(animation,callback){
			
			var save = [animation,callback]

			// Es wird immer nur eine Animation zugelassen
			// Verhindert Bugs und falsche Animationen
			this.anim[0] = save;
		},

		// Löscht eine Animation aus der anim-Liste
		stopAnimation: function(animation){

				// Das erste Element wird entfernt
				// Stopt die Animation
				this.anim.shift();

		},

		// Fügt eine Callbackmethode einem Objekt hinzu
		// Momentan nur "click" auf Globi im Hauptmenü
		setCallback: function(event,callback){
			this.globiContainer.addEventListener(event,callback);
		},

		// Erstellt die Objekte des Hauptmenüs
		initHauptmenue: function(){

			// Lade die Container in die Stage
			this.stage.addChild(this.bg);
			this.stage.addChild(this.globiContainer);
			
		},

		// Verhindert das Auslösen von Ereignissen für ein bestimmes Objekt
		disableEvents: function(objekt){
			this[objekt].mouseEnabled = false;
		},

		// Berechtigt das Auslösen von Ereignissen für ein bestimmes Objekt
		enableEvents: function(objekt){
			this[objekt].mouseEnabled = true;
		},


		/**************************************/
		/* Animationen für Globi im Hauptmenü */

		globi_idle: function(){
			this.globiContainer.x += this.idle_globi;
			this.globiContainer.y += this.idle_globi;
			if(this.globiContainer.x > 520 || this.globiContainer.x <490) { 
				this.idle_globi *= -1;
			}

		},

		globi_menue_popUp: function(callback){
			
			this.scaleCount++


			if( this.globiContainer.scaleX >= 2.2){
				this.stopAnimation("globi_menue_popUp");

				if(callback){
					callback();
				}
			} else {
				this.globiContainer.x += 10;
				this.globiContainer.y -= 10;


				this.globiContainer.scaleX += 0.2;
				this.globiContainer.scaleY += 0.2;

			}
		},

		globi_menue_popDown: function(callback){
			
	

			if( this.globiContainer.scaleX < 1.2){
				this.globiContainer.x = 500;
				this.globiContainer.y = 450;
				this.stopAnimation("globi_menue_popDown");
				this.startAnimation("globi_idle");
				this.enableEvents("globiContainer");
				
				if(callback){
					callback();
				}

			} else {
				this.globiContainer.x -= 10;
				this.globiContainer.y += 10;


				this.globiContainer.scaleX -= 0.2;
				this.globiContainer.scaleY -= 0.2;

			}

		},

		globi_transition_toLevel: function(callback){

			// Skaliere Globi auf eine bestimmte Größe
			if( this.globiContainer.scaleX >= 3.5){
				
				// Animation stoppen
				this.stopAnimation("globi_transition_toLevel");
				
				// Callback ?
				if(callback){
					callback();
				}

			} else {

				// Vergrößere Globi
				this.globiContainer.scaleX += 0.2;
				this.globiContainer.scaleY += 0.2;
			}

			
		}




	});

	return Engine;
});
