
/*
*	GlobisEuropa :: main.js
*	=======================
*	global configuration
*	Gamesetup & start
*/

require.config({
	shim: {
        easel: {
            exports: 'createjs'
        },
        prototype: {
            // Don't actually need to use this object as 
            // Prototype affects native objects and creates global ones too
            // but it's the most sensible object to return
            exports: 'Prototype'
        },
    },

	paths: {
		"protoype" : "lib/prototype-1.7.1",
		"jquery"   : "lib/jquery-2.0.0.min",
		"class": "lib/class",
		easel	   : "lib/easeljs-0.6.0.min"
	},
	baseUrl: "js"
});


define(['app','jquery'], function(App,$){
	
	var app,engine;

	var init = function(){

		// Check, if document loaded
		$(document).ready(function(){

			/* Eine Anwendung wird erstellt
			Warte bis die Ajax-Abfrage in der Anwendung fertig ist
			*/
			app = new App();
			app.ready(function(){
				
				// Binde die Buttons
				$('#startGame').click(function(){
					initEngine();
					$('#loadingContainer').addClass('hide');
					$('#canvasContainer').removeClass('hide');
				});
				
			});
			
			
			
		});
	};

	var initEngine = function(){
		require(['engine'], function(Engine){

			var canvas = document.getElementById('canvas');
			engine = new Engine();
			engine.setup('#gameContainer',canvas);
			engine.loadSzene('hauptmenue');
			



		});

	};

	init();
});