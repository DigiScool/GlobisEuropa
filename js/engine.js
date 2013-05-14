/*
*	Spielt Animationen ab. 
*	Fügt Objekte der Stage hinzu
*	Arbeitet nur mit der Canvas. Keine CSS-Animationen,  etc.
*/


define(['globi'],function(Globi){
	
	var Engine = Class.extend({
		
		init: function(stage){
			
			this.stage = stage;
			this.stage.enableMouseOver(10);
			

			// Objekte
			// Hintergrund
			this.bg = new createjs.Bitmap('gfx/big/mainmenue_background.png');


			// Globi
			this.globi = new Globi();
			this.globiContainer = this.globi.getContainer();


			// Speicher für die laufende Animationen
			this.anim = [];


			// INTRO
			this.intro = [];
			this.introTime = 0;
			this.introPointer = 0;
			this.introShow = false;
			/////////////////////////


			// Variablen für die Animationen
			this.idle_globi = 1;


			createjs.Touch.enable(this.stage);
			createjs.Ticker.setFPS(60);
			createjs.Ticker.useRAF = true;
			createjs.Ticker.addListener(this);

			// Erweitere easeljs um benötigte Funktionen
			
		
		},

		initImages: function(){
			// Bereite alle Bilder vor, die zum BSp einen Listener haben
		},

		// Callback -Funktion für die Frameloop
		// Zeigt die Animation an, die im Array anim gespeichert ist
		tick: function(){
			
			if(this.anim[0]) { 
				
				// Rufe Funktion auf und übergib Callback
				this[this.anim[0][0]](this.anim[0][1]) 
			}

			if(this.introShow == true){
				
				
				if(createjs.Ticker.getTime() - this.introTime > 3000){
					this.stage.removeAllChildren();
					var image = this.intro.shift();
					if(image){
						this.stage.addChild(image);
						this.introPointer++;
						this.introTime = createjs.Ticker.getTime();
					} else {
						this.introShow = false;
						this.intro_ready();
					}

				}
			}

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

		showIntro: function(callback){
			
			// Bilder erstellen
			var image = new createjs.Bitmap("gfx/big/story_1.jpg");
			image.y = -50;
			image.scaleX = 0.8;
			image.scaleY = 0.8;
			this.intro.push(image);
			image = new createjs.Bitmap("gfx/big/story_2.jpg");
			image.y = -50;
			image.scaleX = 0.8;
			image.scaleY = 0.8;
			this.intro.push(image);

			// Time holen, um rauszufinden, wann nächstes Bild 
			// gespielt werden soll
			this.introTime = createjs.Ticker.getTime();
			this.stage.addChild(this.intro.shift());
			// Intro aktivieren
			this.introShow = true;

			// callback aktivieren
			this.intro_ready = callback;
		},
		cancelIntro: function(){
			this.introShow = false;
			this.intro_ready();
		},


		createBitmap: function(){
			return new createjs.Bitmap(arguments[0]);
		},
		setBitmap: function(image){
			if(arguments[1]) image.x = arguments[1];
			if(arguments[2]) image.y = arguments[2];
			if(arguments[3]) image.scaleX = arguments[3];
			if(arguments[4]) image.scaleY = arguments[4];
			return image;
		},

		addBitmap: function(image){

			this.stage.addChild(image);
			
		},

		addPuzzle: function(){
			
			console.log('Creating Bitmap: ' + arguments[0]);
			
			var image = new createjs.Bitmap(arguments[0]);

			if(arguments[1]) image.x = arguments[1];
			if(arguments[2]) image.y = arguments[2];
			if(arguments[3]) image.scaleX = arguments[3];
			if(arguments[4]) image.scaleY = arguments[4];

			this.stage.addChild(image);
			image.addEventListener("mousedown", this.handleMouseDown);
		},

		addObject: function(objekt){
			if(objekt == "globi"){
				this.stage.addChild(this.globiContainer);
			}
		},

		handleMouseDown: function(event) {
            var o = event.target;
            o.parent.addChild(o);
            var offset = {x:o.x-event.stageX, y:o.y-event.stageY};
            event.addEventListener("mousemove", function(ev) {
                o.x = ev.stageX+offset.x;
                o.y = ev.stageY+offset.y;
            });
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

		initLevel1: function(){
			this.bg1 = new createjs.Bitmap('gfx/big/Layout1.png');
			this.bg1.scaleX = 0.8;
			this.bg1.scaleY = 0.8;
			this.bg1.x = -200;
			this.bg1.y = -200;
			this.stage.addChild(this.bg1);


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
