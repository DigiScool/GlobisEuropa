/*
*	app.js
*	======
*	providing screen-functionality, like user inputs,
*	buttons, etc
*/


define(['jquery','lib/prototype-1.7.1'], function($){
	
	var App = Class.create({

		// Konstruktor
		initialize: function(){

			this.images = new Array;
			this.imagesLoaded = 0;
			
			this.list = [ 
				'gfx/big/globi.png',	
				'gfx/big/globus_europa_puretec.gif',
				'gfx/big/Layout11.jpg', 
				'gfx/big/Layout21.jpg', 
				'gfx/big/mainmenue_background.png', 
				'gfx/big/skizze_Globi.jpg',
				'gfx/sprites/globi_hauptmenue.png'
			];

			this.preload();
			
		},

		/*
		*	Vorladen aller benötigten Bilder
		*/
		preload: function(){
			for(var i = 0; i < this.list.length; i++){
				this.loadImage(this.list[i]);
			}
		},

		loadImage: function(filepath){

			// "Speichere" den Scope
			var self = this;

			// Lade ein Bild nach
			var image = new Image();
			image.src = filepath;

			// Callback-Funktion wenn Bild geladen
			image.onload = function(){
				console.log("Ready with: "+filepath)
				self.images.push(image);
				self._checkReady();
			};

			
		},

		_checkReady: function(){
			this.imagesLoaded++;
			var processWidth = (this.imagesLoaded  * 100) / this.list.length + '%';
			$('#process').width(processWidth);
			if(this.imagesLoaded == this.list.length){
				$('#startGame').removeClass('hide');
				console.log('=========== \nAlle Bilder geladen');
				console.log(this.images);
				console.log('\n\n');
				if(this.ready_func){
					this.ready_func();
				}
			}
		},
	
		ready: function(f){

			this.ready_func = f;
	
		}
	});

	return App

});
