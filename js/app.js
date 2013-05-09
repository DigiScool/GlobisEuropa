/*
*	app.js
*	======
*	providing screen-functionality, like user inputs,
*	buttons, etc
*/


define(['szene/hauptmenue','szene/level'],function(Hauptmenue,Level){
	
	var App = Class.extend({

		// Konstruktor
		init: function(gameEngine,cssEngine){
			
			this.gameEngine = gameEngine;
			this.cssEngine = cssEngine;
	
		},

		startSzene: function(name,id){

		
			switch(name){
				case 'hauptmenue': 
					if(!this.hauptmenue){
						this.hauptmenue = new Hauptmenue(this,this.gameEngine, this.cssEngine);
					}
					this.cssEngine.clear();
					this.gameEngine.clearStage();
					this.hauptmenue.startSzene();
					break;
				case 'level':
					if(!this.level){
						this.level = new Level(this,this.gameEngine,this.cssEngine);
					}
					this.level.startSzene(id);
					break;
			}
		},

		szeneCallback: function(next,id){
			this.startSzene(next,id);
		}
	});

	return App

});
