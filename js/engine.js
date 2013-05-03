define(['jquery','easel'], function($){
	

	var Engine = Class.extend({


		init: function(canvas){
			
			this.canvas = canvas;
			this.ctx = this.canvas.getContext('2d');
			this.stage = new createjs.Stage(this.canvas);		
		},

		run: function(){
			createjs.Ticker.setFPS(24);
			createjs.Ticker.addListener(this);
		},

		tick: function(){
			this.stage.update();
			console.log('tick');
		},

		addGlobi: function(){
			var bitmap = new createjs.Bitmap("gfx/big/globi.png")
			this.stage.addChild(bitmap);
				
		}

	});

	return Engine;
});
