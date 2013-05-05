define(['jquery','szene','easel'], function($,Szene){
	
	var Engine = Class.extend({
		init: function(){
			
			this.canvas = null;
			this.gameContainer = null;
			this.renderer = null;
			this.updater = null;
			this.szene = null

			this.audioManager = null;

			this.started = false;



		},

		setup: function(gameContainer, canvas){
			
			var self = this;

			this.gameContainer = $(gameContainer);
			this.canvas = canvas;
			this.renderer = new createjs.Stage(canvas);
			createjs.Ticker.addEventListener("tick", this.handleTick);

			console.log('Engine-Bindings:');
			console.log(this.renderer);
			console.log(this.gameContainer);

		},

		loadSzene: function(name){
			
			var self = this;
			this.renderer.removeAllChildren();
			this.renderer.update();
			this.szene = new Szene(name);
			this.szene.ready(function(){

				var sprites = self.szene.getSprites();
				self.animateSprites(sprites);

			});
		},

		animateSprites : function(sprites){

			if(sprites){
				for(var i = 0; i < sprites.length; i++ ){
					this.renderer.addChild(new createjs.Bitmap('gfx/sprites/'+sprites[i].url));
					this.renderer.update();
					console.log(this.renderer);
				}
			}

		},

		handleTick : function(){
			console.log('Frames ticktack');
		}

	});

	return Engine;
});
