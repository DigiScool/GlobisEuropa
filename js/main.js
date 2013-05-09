

define(['jquery','app'], function($,App){
	
	var app;
	var engine;
	var stage;

	var initApp = function(){

			app = new App();

			$('#menue_picture_area').click(function(){
				app.startLevel("level11");
			});

			$('#button_zurueck').click(function(){
				app.toggleMenue();
			});

			$('#button_newGame').click(function(){
				app.toggleMenue();
			});

			$('button_home').click(function(){
				app.showGamemenue();
			});

			console.log('Application erstellt');

			initEngines();
	};	

	function initEngines(){
		require(['engine',], function(Engine){

			var canvas = document.getElementById('canvas');
			stage = new createjs.Stage(canvas);
			engine = new Engine(stage);


			app.setup(engine);
			app.loadSzene('hauptmenue');

		});
	};

	initApp();
	
});