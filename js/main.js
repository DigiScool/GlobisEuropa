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
				app.setGameState("intro");
			});

			$('#button_cancelIntro').click(function(){
				app.cancelIntro();
			});

			$('#button_mute').click(function(){
				$('#audio').get(0).play();
			});

			$('#level_puzzle_menueHoverArea').mouseover(function(){
				$('#level_puzzle_partsMenue').removeClass('hide');
			});



			console.log('Application erstellt');

			initEngines();
	};	

	function initEngines(){
		require(['engine',], function(Engine){

			var canvas = document.getElementById('canvas');
			stage = new createjs.Stage(canvas);
			engine = new Engine(stage,app);


			app.setup(engine);

			// DEBUGGING
			$('#test_mundAnimation').click(function(){
					engine.showSpriteAnimation('mund1');
			});
			$('#test_mundAnimation2').click(function(){
					engine.showSpriteAnimation('mund2');
			});
			

			app.setGameState("startup");

		});
	};

	initApp();
	
});