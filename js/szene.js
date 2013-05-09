define(['jquery','easel','lib/prototype-1.7.1'], function($){
	


	var Szene = Class.create({
		
		container: createjs.Container();

		initialize: function(){
			
			var self = this;

			// Globi erstellen
			
			container.globi.x = 100;

			// Umrisse

			var fuellung = new createjs.Graphics();
			fuellung.setStrokeStyle(10);
			fuellung.beginStroke(createjs.Graphics.getRGB(55,113,200));
			fuellung.beginFill(createjs.Graphics.getRGB(42,127,255));
			fuellung.drawCircle(0,0,196);
			fuellung.name = 'fuellung';


			this.globi.addChild( new createjs.Shape(fuellung));

			this.globi.addEventListener("click", function(){
				
				if(!self.globiMoved){
					self.globiMoved = true;
					self.globiSlideLeft  = true;
					self.animations.push(self.globi_moveLeft());
				}
			});


			this.globi.x = 500;
			this.globi.y = 380;

			this.renderer.addChild(this.globi);

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

			return container;
		},
	});

	return Szene
});