
/*
*	GlobisEuropa :: main.js
*	=======================
*	global configuration
*	Gamesetup & start
*/


require.config({

	paths: 
	{
		'jquery'   : 'lib/jquery-2.0.0.min',
		'class': 	 'lib/class',
		'easel'	   : "lib/easeljs-0.6.0.min"
	},

	shim: 
	{
        'easel': 
        {
            exports: 'Easel'
        },
        
        'class': 
        {
        	exports: 'Class'
        }
    },

	baseUrl: "js"
});


define(['lib/class','lib/easeljs-0.6.0.min','jquery'], function(){
	
	var app;
	var canvasEngine;
	var cssEngine;
	var canvas;
	var stage;

	function initApp(){
		require(['app','engine','cssEngine'], function(App,Engine,CSS){
			// New Easel.js - Objekt
			canvas = document.getElementById('canvas');
			
			
			stage = new createjs.Stage(canvas);
			

			cssEngine = new CSS();
			canvasEngine = new Engine(stage);
			
			createjs.Ticker.setFPS(60);
			createjs.Ticker.useRAF = true;
			createjs.Ticker.addListener(canvasEngine);

			

			// New Application with Engines
			app = new App(canvasEngine,cssEngine);
			app.startSzene('hauptmenue');
		});
	};

	initApp();
	
});