

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

			$('#button_home').click(function(){
				app.showGamemenue();
			});

			$('#button_startGame').click(function(){
				app.setGameState(1);
			});

			$('#button_cancelIntro').click(function(){
				console.log('afasa');
				app.cancelIntro();
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
			app.setGameState(0);

		});
	};

	initApp();
	
});