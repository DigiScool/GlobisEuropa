/*
*	Spielt Animationen ab. 
*	Fügt Objekte der Stage hinzu
*	Arbeitet nur mit der Canvas. Keine CSS-Animationen,  etc.
*/


define(['globi','lib/filters/BoxBlurFilter','lib/filters/ColorFilter'],function(Globi){
	
	var Engine = Class.extend({
		
		init: function(stage){
			
			// Initialisierungen
			var self = this;

			this.stage = stage;
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
			this.container_level = new createjs.Container();
			this.partsContainer = new createjs.Container();
			this.lvl_bg = null;		

			
         
           	
           

			var g = new createjs.Graphics();
			g.beginFill(createjs.Graphics.getRGB(0,0,0));
            g.rect(0,0,50,600);
			this.puzzle_menueMouseOver = new createjs.Shape(g).set({alpha:0.8});
			this.puzzle_menueMouseOver.addEventListener("mouseover", function(){
				self.container_level.x = 0;
			});

			// Container für Puzzleteile
			this.puzzleParts = new createjs.Container();
			
			// Variablen für die Animationen
			this.idle_globi = 1;


			// Hit-Elements zum checken ob getroffen
			this.container_hitshapes = new createjs.Container();



			
		},

		setup: function(app,level){
			this.level = level;
			this.app = app;
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
				self.app.changeCursor('pointer');

				self.globi.getChildAt(0).graphics = g;
			});

			this.globi.addEventListener("mouseout",function(){
				self.app.changeCursor('default');
				var g = new createjs.Graphics()
				.setStrokeStyle(10)
            	.beginStroke(createjs.Graphics.getRGB(141,211,237))
            	.beginFill(createjs.Graphics.getRGB(27,156,247))
				.drawCircle(0,0,200);



				self.globi.getChildAt(0).graphics = g;
			});

			this.globi.addEventListener("click",function(){
				self.app.changeCursor('default');
				self.app.toggleMenue();
				self.enableLandSelection();
			});
		},
		setLevel: function(level,puzzle,callback){
			
			var self = this;

			// Hintergrund laden
			this.lvl_bg = new createjs.Bitmap(level.bg);
			this.lvl_bg.x = level.bgx;
			this.lvl_bg.y = level.bgy;
			this.lvl_bg.scaleX = 0.8;
			this.lvl_bg.scaleY = 0.8;
			this.stage.addChild(this.lvl_bg);

			console.log("BG + HM");
			console.log(this.lvl_bg);
			console.log(this.container_level);
			console.log("********************");

			// Hitshape - Position korrigieren
			this.container_hitshapes.y += +120;

			// Hitshapes ( anzeige on //off)
			//this.stage.addChild(this.container_hitshapes);

			// Seitenleiste für die Puzzle-teile
			var menue_bg = new createjs.Graphics();
			menue_bg.beginFill(createjs.Graphics.getRGB(245,242,222));
            menue_bg.rect(0,0,250,600);
            
            this.menue_shape = new createjs.Shape(menue_bg);
			
			// Hintergrund für Seitenmenü laden
			this.stage.addChild(this.menue_shape);

			
			///////////////////////////////////// 
			// Puzzle-Teile Bilder für die Seitenleiste laden
			// eventhandler hinzufügen

			this.container_puzzleparts = new createjs.Container();

			if(puzzle){
				for(var i = 0; i < puzzle.length; i++){
					
					// menueentry for the puzzlepart
					var menueEntry = new createjs.Bitmap(puzzle[i].part);
					menueEntry.y = 200 * i;
					menueEntry.x = 50;
					menueEntry.scaleX = 0.5;
					menueEntry.scaleY = 0.5;

					// hitshape for the puzzlepart
					var g = new createjs.Graphics();
					var h  = puzzle[i].hitshape;
					g.beginFill(createjs.Graphics.getRGB(0,0,0));
            		g.rect(h.x,h.y,h.w,h.h);
            		
            		var hitShape = new createjs.Shape(g); 
            	
					// hitshape with the id, to compare
					menueEntry.puzzlePart = puzzle[i].part;
					menueEntry.puzzleId = puzzle[i].id;

					hitShape.puzzleId = puzzle[i].id; 
					hitShape.countryName =  puzzle[i].country;
					hitShape.menueEntry = menueEntry;
					hitShape.posCorrection = puzzle[i].position;
					
					// Wrapp the Listener for scope
					(function(target) {

						var dndPart = new createjs.Bitmap(target.puzzlePart);
						
						target.addEventListener("mouseover",function(){
							self.app.changeCursor('pointer');
						});

						target.addEventListener("mouseout", function(){
							self.app.changeCursor('default');
						});

						target.addEventListener("mousedown",function(evt) {

							var offset = {x:target.x-evt.stageX, y:target.y-evt.stageY};

							dndPart = target.clone();
							dndPart.x = evt.stageX+offset.x;
							dndPart.y = evt.stageY+offset.y
							dndPart.scaleX = 0.8;
							dndPart.scaleY = 0.8;
							self.stage.addChild(dndPart);
				

							evt.onMouseMove = function(ev){

								dndPart.x = ev.stageX+offset.x;
								dndPart.y = ev.stageY+offset.y;
							
							}

							evt.onMouseUp = function(ev){
								self.app.changeCursor('default');
  								// Try to find a hitshape under the dndPart
  								var hitShape = self.container_hitshapes.getObjectUnderPoint(ev.stageX,ev.stageY);
  				
  								if(hitShape){ 
  									
  									if(hitShape.puzzleId == target.puzzleId){
										// Positionskorrektur
										dndPart.x = hitShape.posCorrection.x;
										dndPart.y = hitShape.posCorrection.y;
										self.level.showInfo(hitShape.puzzleId);
										self.sortMenue(target);
									} else {
										alert('Falsches Land');
										self.stage.removeChild(dndPart);
									}
  								} else { 
  									self.stage.removeChild(dndPart);
  									//TODO:
  									// SNAPBAK FUNCTION
  								}
							}
						});

						

					})(menueEntry);
					
					// load generated parts into container
					this.container_puzzleparts.addChild(menueEntry);
            		this.container_hitshapes.addChild(hitShape);
					
				}
            }

            // generierten Puzzlteile anzeigen
  			this.stage.addChild(this.container_puzzleparts);

            console.log('HITSHAPES:');
            console.log(this.container_hitshapes);
            console.log('DRAG AND DROP PARTS:');
            console.log(this.container_puzzleparts);

            // Buttons zum navigeren durch das Menue
            var button_down = new createjs.Bitmap("gfx/little/button.png");
            button_down.addEventListener("click", function(){
            		
            	var firstChild = self.container_puzzleparts.getChildAt(0);
            	if( firstChild.y >= 0){
            		// do nothing
            	} else {
            		for(var i = 0; i < self.container_puzzleparts.getNumChildren(); i++){
            			var child = self.container_puzzleparts.getChildAt(i);
            			child.y	+= 100;
            		}
            	}
            });

            var button_up = new createjs.Bitmap("gfx/little/button.png");
            button_up.y = 500;

            button_up.addEventListener("click", function(){
            	for(var i = 0; i < self.container_puzzleparts.getNumChildren(); i++){
            		var child = self.container_puzzleparts.getChildAt(i);
            		child.y	-= 100;
            	}
            });

            this.stage.addChild(button_up);
            this.stage.addChild(button_down);
            
            if(callback) {
            	callback()
            };
			
		},

		sortMenue: function(target){
			var index = this.container_puzzleparts.getChildIndex(target);
			var pos = target.y;
			var newPos = 0;
			this.container_puzzleparts.removeChild(target);
			for(var i = index ; i < this.container_puzzleparts.getNumChildren(); i++){
				console.log(pos + newPos*200);

				this.container_puzzleparts.getChildAt(i).y = pos + newPos*200;
				newPos++;
			}

			

		},

		enableLandSelection: function(){

			// scope
			var self = this;

			// activate childevents
			this.globi.removeAllEventListeners();
			
			

			var mouseover_se = this.globiObjekt.getSouthEurope('#68ba5b','#ffffff');
			var mouseover_we = this.globiObjekt.getWestEurope('#68ba5b','#ffffff');
			var mouseover_oe = this.globiObjekt.getOstEurope('#68ba5b','#ffffff');
			
			
			
			(function(target){
				target.addEventListener("mouseover", function(ev){
					self.app.changeCursor('pointer');
					self.globi.addChild(mouseover_we);
					self.app.positionBubble("#bubble_selectshape",ev.stageX + 10,ev.stageY);
					self.app.setDOMText("#bubble_selectshape_txt",'Westeuropa');
					self.app.addBubble("#bubble_selectshape");
				});

				target.addEventListener("mouseout", function(){
					self.globi.removeChild(mouseover_we);
					self.app.removeBubble("#bubble_selectshape");
					self.app.changeCursor('default');
				});

				target.addEventListener("click", function(){
					self.app.removeBubble("#bubble_selectshape");
					self.app.startLevel("level_we-1");
					self.app.changeCursor('default');
				});

			})(this.globiObjekt.we_container);


			(function(target){
				target.addEventListener("mouseover", function(ev){
					self.app.changeCursor('pointer');
					self.globi.addChild(mouseover_se);
					self.app.positionBubble("#bubble_selectshape",ev.stageX + 10,ev.stageY);
					self.app.setDOMText("#bubble_selectshape_txt",'Südeuropa');
					self.app.addBubble("#bubble_selectshape");
					
				
				});

				target.addEventListener("mouseout", function(ev){
					self.globi.removeChild(mouseover_se);
					self.app.removeBubble("#bubble_selectshape");
					self.app.changeCursor('default');
				});

				target.addEventListener("click", function(){
					self.app.removeBubble("#bubble_selectshape");
					self.app.startLevel("level_se-1");
					self.app.changeCursor('default');
				});

			})(this.globiObjekt.se_container);

			(function(target){
				target.addEventListener("mouseover", function(ev){
					self.app.changeCursor('pointer');
					self.globi.addChild(mouseover_oe);
					self.app.positionBubble("#bubble_selectshape",ev.stageX + 10,ev.stageY);
					self.app.setDOMText("#bubble_selectshape_txt",'Osteuropa');
					self.app.addBubble("#bubble_selectshape");
					
				
				});

				target.addEventListener("mouseout", function(ev){
					self.globi.removeChild(mouseover_oe);
					self.app.removeBubble("#bubble_selectshape");
					self.app.changeCursor('default');
				});

			})(this.globiObjekt.oe_container);

			
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
		stopAnimation: function(){


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
