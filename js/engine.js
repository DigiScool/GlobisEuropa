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


			// Speicher für die laufenden Animationen
			this.anim = new Array();
			/////////////////////////


			// Variablen für die Animationen
			this.idle_globi = 1;
		
		},

		// Callback -Funktion für die Frameloop
		// Zeigt alle Animationen an, die im Array anim gespeichert sind
		tick: function(){
			if(this.anim.length != 0) { this[this.anim[0]]() };
			this.stage.update();
			console.log(this.globiContainer.scaleX);
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
		startAnimation: function(animation){
			this.anim[0] = animation;
			console.log(this.anim);
		},

		// Löscht eine Animation aus der anim-Liste
		stopAnimation: function(animation){

				this.anim.shift();
				console.log(this.anim);
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

		globi_menue_popUp: function(){
			
			this.scaleCount++


			if( this.globiContainer.scaleX >= 2.2){
				this.stopAnimation("globi_menue_popUp");

			} else {
				this.globiContainer.x += 10;
				this.globiContainer.y -= 10;


				this.globiContainer.scaleX += 0.2;
				this.globiContainer.scaleY += 0.2;

			}
		},

		globi_menue_popDown: function(){
			
	

			if( this.globiContainer.scaleX < 1.2){
				this.globiContainer.x = 500;
				this.globiContainer.y = 450;
				this.stopAnimation("globi_menue_popDown");
				this.startAnimation("globi_idle");
				this.enableEvents("globiContainer");

			} else {
				this.globiContainer.x -= 10;
				this.globiContainer.y += 10;


				this.globiContainer.scaleX -= 0.2;
				this.globiContainer.scaleY -= 0.2;

			}

		},

		globi_transition_toLevel: function(){

			if( this.globiContainer.scaleX >= 3.5){
				
				this.stopAnimation("globi_transition_toLevel");

			} else {
				this.globiContainer.scaleX += 0.2;
				this.globiContainer.scaleY += 0.2;
			}

			
		}




	});

	return Engine;
});
