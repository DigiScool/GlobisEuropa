define(['jquery','szene','easel','lib/prototype-1.7.1'], function($,Szene){
	
	var Engine = Class.create({
		init: function(){
			
			this.canvas = null;
			this.gameContainer = null;
			this.renderer = null;
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

		},

		loadSzene: function(name){
			
			/* Lade die Elemente einer Szene , als Container
			*  Bsp. Globi's Torse, Hände, Augen , etc.. seperat, 
			* aber als Einheit im Container */
			this.szene = new Szene(this.renderer);
			this.szene.initSzene();
		
			
			createjs.Ticker.addListener(this.renderer);
			createjs.Ticker.useRAF = true;
			// Best Framerate targeted (60 FPS)
			createjs.Ticker.setFPS(30);


		},

		tick: function(){
			this.renderer.update();
			console.log('tick');
		},

	});

	return Engine;
});
