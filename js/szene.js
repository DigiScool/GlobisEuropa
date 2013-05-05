define(['jquery'], function($){
	
	var Szene = Class.extend({
		
		init: function(name){
			this.data = [];

			this.szeneName = name;
			this.path = 'js/json/'+name+'.json';

			this.dataLoaded = false;
			this.spritesLoaded = false;
			this.szeneLoaded = false;

			this.loadData();
			
			
		},

		loadData: function(){
			
			var self = this;
			// Hole die Levelinformationen mithilfe von Ajax
			$.get(self.path, function(data){
				self.initSzene(data);
				self.dataLoaded  = true;
				self.checkReady();
			}, 'json');
		},


		initSzene: function(jsonData){
			
			// JSONFile-Ausgabe zum debuggen
			this.data = jsonData;


			// Zeige Headline
			$('#headline').html(this.data.headline);

			// Zeige alle szenerelevanten Buttons an
			// Verstecke erst alle Buttons
			$(':button').addClass('hide');
			
			if(this.data.buttons){
				var buttons = this.data.buttons;
				for(var i = 0; i < buttons.length; i++){
				
					var id = '#'+buttons[i].id;
					$(id).removeClass('hide');
				}
			}
			
			
		},

		getSprites : function() {
			return this.data.sprites;
		},


		// Funktionen geben Callback, ob die Daten fertig geladen wurden
		// siehe Engine.js -> ready
		checkReady: function(){
			if(this.ready_func){
				this.ready_func();
			}
		},

		ready: function(f) {
        	this.ready_func = f;
        },
	});

	return Szene
});