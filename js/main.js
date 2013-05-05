
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
        }
    },

	paths: {
		"jquery"   : "lib/jquery-2.0.0.min",
		"class": "lib/class",
		easel	   : "lib/easeljs-0.6.0.min"
	},
	baseUrl: "js"
});


define(['app','class'], function(App,Engine){
	
	var app,engine;

	var init = function(){

		// Check, if document loaded
		$(document).ready(function(){

			app = new App();

			// Set Button-Bindings
			
			$('#button_newGame').click(function(){
				app.loadSzene('newGame');
			});

			$('#button_zurueck').click(function(){
				app.loadSzene('hauptmenue');
			});

			$('#button_loadLevel').click(function(){
				alert('load LEvel');
			});

			console.info('Applikation fertig erstellt. Starte Engine');

			initEngine();

		});
	};

	var initEngine = function(){
		require(['engine'], function(Engine){

			var canvas = document.getElementById('canvas');
			engine = new Engine();
			engine.setup('#gameContainer',canvas);
			engine.loadSzene('hauptmenue');
			app.setEngine(engine);



		});

	};

	init();
});