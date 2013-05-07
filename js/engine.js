define(['jquery','szene','easel','lib/prototype-1.7.1'], function($,Szene){
	
	var Engine = Class.create({
		init: function(){
			
			this.canvas = null;
			this.gameContainer = null;
			this.updater = null;
			this.szene = null;

			this.audioManager = null;

			this.started = false;
		},

		setup: function(gameContainer, canvas){
			
			var self = this;

			this.gameContainer = $(gameContainer);
			this.canvas = canvas;
			this.renderer = new createjs.Stage(canvas);
			

			console.log('Engine-Bindings:');
			console.log(this.renderer);
			console.log(this.gameContainer);

			// Best Framerate targeted (60 FPS)
			createjs.Ticker.useRAF = true;
			createjs.Ticker.setFPS(60);
			createjs.Ticker.addListener(this.renderer);

		},

		loadSzene: function(name){
			
			/* Lade die Elemente einer Szene , als Container
			*  Bsp. Globi's Torse, Hände, Augen , etc.. seperat, 
			* aber als Einheit im Container */
			this.szene = new Szene();
			var container = this.szene.initSzene();
			
			this.renderer.addChild(container);
			this.renderer.update();
			
			


		},

	});

	return Engine;
});
