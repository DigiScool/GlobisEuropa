define(['jquery'],function($){

	var Level = Class.extend({

		init: function(app,engine){
			this.app = app;
			this.engine = engine;

			this.data = { 
				"11" : {
					"headline" : "Westeuropa Level 1",
					"images" : [
						{
							"url" : "gfx/big/Westeuropa.png",
							"x" : "200",
							"y" : -330 , 
							"sX" : 0.8,
							"sY" : 0.8
						}],
					"puzzle" : ["gfx/little/GER.png"],
					"buttons" :  ["button_home"]
				},

				"hm" : {
					"headline" : "Hauptmenü",
					"images" : [
					{
						"url" : "gfx/big/mainmenue_background.png",
						"x"  : "0",
						"y"  : "0", 
						"sX" : "1",
						"sY" : "1",
					}],
					"obj" : ["globi"],
					"animation" : "globi_idle",
					"buttons" :  ["button_newGame"]
				}
			};

		},

		start: function(id){

			// Clear den Screen
			this.engine.clearStage();

			console.log('Try to Start:' + id);		

 			// Sind Bilder definiert ? 
 			var img = this.data[id].images;
 			if(img){
 				for(var i = 0; i<img.length; i++){
 					
 					// Erzeuge Bild
 					var image = this.engine.createBitmap(img[i].url);
 					// Größe bestimmen
 					image = this.engine.setBitmap(image,img[i].x,img[i].y,img[i].sX,img[i].sY);
 					// Sind Events definiert ?
 					if(img[i].event){
 						for(var j = 0; j < img[i].event.length; j++){
 							image.addEventListener(img[i].event[j].typ, img[i].event[j].name);
 							console.log(image.hasEventListener("mouseover"));
 						}
 					}
 					this.engine.addBitmap(image);
 					

 				}
 			}

 			// Sind Puzzle-Teile definiert ?
 			var pzl = this.data[id].puzzle;
 			if(pzl){
 				for(var i = 0; i<pzl.length; i++){

 					this.engine.addPuzzle(pzl[0]);
 				}
 			}
 			
 			// Werden Objekt-Klassen verwendet ?
 			var oc = this.data[id].obj;
 			if(oc){
 				for(var i = 0; i<oc.length; i++){

 					this.engine.addObject(oc[i]);
 				}
 			}

 			// Ist eine Animation definiert ?
 			var anim = this.data[id].animation;
 			if(anim) this.engine.startAnimation(anim);

 			// Buttons ?
 			var bt = this.data[id].buttons;
 			if(bt){
 				for(var i = 0; i<bt.length; i++){
 					var name = '#'+bt[i];
 					$(name).removeClass('hide');
 				}
 			}

 			
 				
		},
	});

	return Level;

});