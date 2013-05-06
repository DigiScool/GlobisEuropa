define(['jquery','easel','lib/prototype-1.7.1'], function($){
	


	var Szene = Class.create({
		
		initialize: function(renderer){
			

			this.imageCache = [];


			this.data = {
				images: ["gfx/sprites/globi_hauptmenue.png"],
				frames: {width: 300, height: 300, regX: -350, regY:-300},
				animations: {
					bounce:[0,5,"bounce",0]
				}

			};

			this.renderer = renderer;
			this.szeneName = name;
			
		},



		initSzene: function(){
			
			// Zeige Headline
			$('#headline').html('Hauptmenü');
			var bg = new createjs.Bitmap("gfx/big/mainmenue_background.png");

			var spriteSheet = new createjs.SpriteSheet(this.data);
			var animation = new createjs.BitmapAnimation(spriteSheet);

			animation.gotoAndPlay("bounce");

			var container = new createjs.Container();

			container.addChild(bg);
			container.addChild(animation);

			this.renderer.addChild(container);
		},
	});

	return Szene
});