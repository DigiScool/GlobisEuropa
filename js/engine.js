/*
*	Spielt Animationen ab. 
*	Fügt Objekte der Stage hinzu
*	Arbeitet nur mit der Canvas. Keine CSS-Animationen,  etc.
*/


define(['globi','lib/filters/BoxBlurFilter'],function(Globi){
	
	var Engine = Class.extend({
		
		init: function(stage,app){
			
			// Initialisierungen
			var self = this;
			this.stage = stage;
			this.app = app;
			this.stage.enableMouseOver(5);
			
			createjs.Touch.enable(this.stage);
			createjs.Ticker.setFPS(60);
			createjs.Ticker.useRAF = true;
			createjs.Ticker.addListener(this);

		
			// Speicher für die laufende Animationen
			this.anim = [];


			// INTRO ////////////////
			this.intro = [];
			this.introTime = 0;
			this.introPointer = 0;
			this.introShow = false;
			/////////////////////////


			/////////////////////////
			// Container ////////////
			
			// Container für Hauptmenue
			this.hmContainer = new createjs.Container();
			this.hm_bg = null;
			this.globiObjekt = new Globi();
			this.globi = this.globiObjekt.getContainer();

			
			// Container für Level
			this.levelContainer = new createjs.Container();
			this.partsContainer = new createjs.Container();
			this.lvl_bg = null;		

			// Bereite die Menüs für die level vor
			var g2 = new createjs.Graphics();
			g2.beginFill(createjs.Graphics.getRGB(245,242,222));
            g2.rect(0,0,250,600);
            this.puzzle_partsMenue = new createjs.Shape(g2);
         
           	
           

			var g = new createjs.Graphics();
			g.beginFill(createjs.Graphics.getRGB(0,0,0));
            g.rect(0,0,50,600);
			this.puzzle_menueMouseOver = new createjs.Shape(g).set({alpha:0.8});
			this.puzzle_menueMouseOver.addEventListener("mouseover", function(){
				self.levelContainer.x = 0;
			});

			// Container für Puzzleteile
			this.puzzleParts = new createjs.Container();
			
			// Variablen für die Animationen
			this.idle_globi = 1;

			// aktuelles Drag & drop Image;
			this.dndImage;

			// Array für Drag and Drop images;
			this.dndParts = [];

			// Hit-Elements zum checken ob getroffen
			this.container_hitshapes = new createjs.Container();

			// Array mit Hitinformationen
			this.hitInformation = [];


			
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
						this.introTime = createjs.Ticker.getTime();
					} else {
						this.introShow = false;
						this.intro_ready();
					}

				}
			}
			this.stage.update();
		},

		setHauptmenue: function(bg){
			
			var self = this;

			this.hm_bg = new createjs.Bitmap(bg);
			this.hmContainer.addChild(this.hm_bg);
			this.hmContainer.addChild(this.globi);
			this.enableEvents_Hauptmenue();
			
		
		},

		enableEvents_Hauptmenue: function(){
			
			var self = this;

			var g = new createjs.Graphics()
				.setStrokeStyle(10)
            	.beginStroke(createjs.Graphics.getRGB(141,211,237))
            	.beginFill(createjs.Graphics.getRGB(27,156,247))
				.drawCircle(0,0,200);

				this.globi.getChildAt(0).graphics = g;

				this.globiObjekt.we_shape.removeAllEventListeners();
			this.globi.addEventListener("mouseover",function(){
				var g = new createjs.Graphics()
				.setStrokeStyle(10)
				.beginFill(createjs.Graphics.getRGB(27,156,247))
				.beginStroke('#ffffff')
				.drawCircle(0,0,200);

				self.globi.getChildAt(0).graphics = g;
			});

			this.globi.addEventListener("mouseout",function(){
				
				var g = new createjs.Graphics()
				.setStrokeStyle(10)
            	.beginStroke(createjs.Graphics.getRGB(141,211,237))
            	.beginFill(createjs.Graphics.getRGB(27,156,247))
				.drawCircle(0,0,200);

				self.globi.getChildAt(0).graphics = g;
			});

			this.globi.addEventListener("click",function(){
				
				self.app.toggleMenue();
				self.enableLandSelection();
			});
		},
		setLevel: function(bg,puzzle,callback){
			
			var self = this;

			
			
			// Hintergrund laden
			this.lvl_bg = new createjs.Bitmap(bg);
			this.lvl_bg.x = 200;
			this.lvl_bg.y = -350;
			this.lvl_bg.scaleX = 0.8;
			this.lvl_bg.scaleY = 0.8;
			this.stage.addChild(this.lvl_bg);

			//Hitshapes nicht anzeigen
			//this.levelContainer.addChild(this.container_hitshapes);
			
			// Container für das Seitenmenü laden
			this.levelContainer.addChild(this.puzzle_partsMenue);
			this.levelContainer.addChild(this.partsContainer);
			///////////////////////////////////// 
			// Puzzle-Teile Bilder für die Seitenleiste laden
			// eventhandler hinzufügen
			if(puzzle){
				for(var i = 0; i < puzzle.length; i++){
					
					// Array für die HitAreas füllen
					// leeres Objekt
					var hit = {};
					hit.id   = puzzle[i].id;
					hit.country = puzzle[i].country;
					hit.part = new createjs.Bitmap(puzzle[i].part);
					hit.x = puzzle[i].position.x;
					hit.y = puzzle[i].position.y;
					hit.part.y = puzzle[i].position.y;
					hit.part.scaleX = 0.8;
					hit.part.scaleY = 0.8;
					
					// HitShape
					var g = new createjs.Graphics();
					var h  = puzzle[i].hit;
					g.beginFill(createjs.Graphics.getRGB(0,0,0));
            		g.rect(h.x,h.y,h.w,h.h);
            		hit.shape = new createjs.Shape(g); 
					
					hit.menue = new createjs.Bitmap(puzzle[i].menue);
					hit.menue.y = 200 * i;
					hit.menue.x = 50;
					hit.menue.scaleX = 0.8;
					hit.menue.scaleY = 0.8;
					

					// Callback für Mousedown
					hit.menue.addEventListener("mousedown",function(e){
						console.log('click');
						for(var j = 0; j < self.hitInformation.length; j++){
							
							if(self.hitInformation[j].menue == e.target){
								var showPart = self.hitInformation[j].part;
								showPart.x = e.target.x;
								showPart.y = e.target.y;
								self.stage.addChild(showPart);
								e.target = showPart;
								self.pressHandler(e);
							}
						}
						
					});

                	this.partsContainer.addChild(hit.menue);
                	this.container_hitshapes.addChild(hit.shape);
                	this.hitInformation.push(hit);
				}
            }
            // Debugausgabe
            console.log('HITINFORMATION:');
            console.log(this.hitInformation);
            console.log('HITSHAPES:');
            console.log(this.container_hitshapes);
            console.log('DRAG AND DROP PARTS:');
            console.log(this.partsContainer)

            // Buttons zum navigeren durch das Menue
            var button_down = new createjs.Bitmap("gfx/little/button.png");
            button_down.addEventListener("click", function(){
            	self.partsContainer.y += 100;
            });
            var button_up = new createjs.Bitmap("gfx/little/button.png");
            button_up.y = 500;
            button_up.addEventListener("click", function(){
            	self.partsContainer.y -= 100;
            });
			//this.levelContainer.addChild(button_up);
            //this.levelContainer.addChild(button_down);

            callback();
			
		},

		enableLandSelection: function(){

			var self = this;

			this.globi.removeAllEventListeners();
			var shape = this.globiObjekt.we_shape;
			console.log(shape);
			
			shape.addEventListener("mouseover", function(ev){
				var g = self.globiObjekt.getGraphic('we_smoothy','#B22222','#ffffff');
				shape.graphics = g;
				self.app.positionBubble("#bubble_selectshape",ev.stageX + 10,ev.stageY);
				self.app.setDOMText("#bubble_selectshape_txt",'Westeuropa');
				self.app.addBubble("#bubble_selectshape");
			});

			shape.addEventListener("mouseout", function(){
				var g = self.globiObjekt.getGraphic('we_smoothy','#ffffff','#ffffff');
				shape.graphics = g;
				self.app.removeBubble("#bubble_selectshape");
			});

			shape.addEventListener("click", function(){
				self.app.removeBubble("#bubble_selectshape");
				self.app.startLevel("level11");
			});

			
		},

		downHandler: function(e,menue){
			console.log(e);
			console.log(menue);
		},

		pressHandler: function(e){
			var self = this;
			var offset = {x:e.target.x-e.stageX, y:e.target.y-e.stageY};
			e.onMouseMove = function(ev){

  				e.target.x = ev.stageX + offset.x;  
  				e.target.y = ev.stageY + offset.y;
  			};

  			e.onMouseUp = function(ev){
  				
  				var hitShape = self.container_hitshapes.getObjectUnderPoint(ev.stageX,ev.stageY);
  				// Es wurde Shape getroffen
  				if(hitShape){
  					var index = self.container_hitshapes.getChildIndex(hitShape);
  					self.hitTest(index,hitShape,e);
  					e.target = null;
  				}
  			}
		},

		hitTest: function(index,shape,e){
			if(this.hitInformation[index].shape == shape && this.hitInformation[index].part == e.target){
				this.partsContainer.removeChild(this.hitInformation[index].menue);
				alert('Richtig: '+this.hitInformation[index].country);
				// Positionskorrektur
				e.target.x = this.hitInformation[index].x;
				e.target.y = this.hitInformation[index].y;

			} else {
				alert('Falsches Land');
				this.stage.removeChild(e.target);
			
			}
		},


		loadContainer: function(cnt,callback){
			this.stage.addChild(this[cnt]);
			console.log('Container geladen. Level ready to rock !')
			if(callback) callback();
		},

		// Säubere die Pinnwand, wenn nichts animiert / angezeigt
		// werden muss
		// Performance Verbesserung
		clearStage: function(){
			console.log('Säubere die Stage');
			this.stage.clear();
			this.stage.removeAllChildren();
		},

		blurStage: function(trigger){
			console.log(this.stage);
			var image = this.stage.getChildAt(0);
			if(trigger == true){
				image.filters = [new createjs.BoxBlurFilter(10,10,3)];
				image.cache(0,350,1100,1300);
				image.alpha = 0.9;
			} else {
				image.filters = [];
				image.updateCache(0,350,1100,1300);
			}
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
			// Bilder erstellen
			var image = new createjs.Bitmap("gfx/big/story_3.jpg");
			image.y = -50;
			image.scaleX = 0.8;
			image.scaleY = 0.8;
			this.intro.push(image);
			image = new createjs.Bitmap("gfx/big/story_4.jpg");
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

		showSpriteAnimation: function(anim){
			switch(anim){
				case 'mund1' :  this.globiObjekt.mundSeq.gotoAndPlay("talkf"); break;
				case 'mund2' :  this.globiObjekt.mundSeq.gotoAndPlay("idle"); break;
			}
		},


		/**************************************/
		/* Animationen für Globi im Hauptmenü */

		globi_idle: function(){
			this.globi.x += this.idle_globi;
			this.globi.y += this.idle_globi;
			if(this.globi.x > 520 || this.globi.x <490) { 
				this.idle_globi *= -1;
			}

		},

		globi_menue_popUp: function(callback){

			if( this.globi.scaleX >= 2.2){
				this.stopAnimation("globi_menue_popUp");

				if(callback){
					callback();
				}
			} else {
				this.globi.x += 10;
				this.globi.y -= 10;


				this.globi.scaleX += 0.2;
				this.globi.scaleY += 0.2;

			}
		},

		globi_menue_popDown: function(callback){
			
	

			if( this.globi.scaleX < 1.2){
				this.globi.x = 500;
				this.globi.y = 450;
				this.stopAnimation("globi_menue_popDown");
				this.startAnimation("globi_idle");
			
				
				if(callback){
					callback();
				}

			} else {
				this.globi.x -= 10;
				this.globi.y += 10;


				this.globi.scaleX -= 0.2;
				this.globi.scaleY -= 0.2;

			}

		},

		globi_transition_toLevel: function(callback){

			// Skaliere Globi auf eine bestimmte Größe
			if( this.globi.scaleX >= 3.5){
				
				// Animation stoppen
				this.stopAnimation("globi_transition_toLevel");
				
				// Callback ?
				if(callback){
					callback();
				}

			} else {

				// Vergrößere Globi
				this.globi.scaleX += 0.2;
				this.globi.scaleY += 0.2;
			}

			
		}




	});

	return Engine;
});
