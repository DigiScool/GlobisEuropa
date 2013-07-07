define(['jquery','app'], function($,App){
	
	var app;
	var engine;
	var level;
	var stage;

	var initApp = function(){

			app = new App();


			$('#button_home').click(function(){
				app.showGamemenue();
			});

			$('#button_quitGame').click(function(){
				app.quitGame();
			});

			$('#button_backtoGame').click(function(){
				app.hideGamemenue();
			});

			$('#button_discoverGame').click(function(){
				app.hideGamemenue();
			});

			$('#button_hide_countryHymne').click(function(){
				$('audio').each(function(){ this.pause() });
				$('#bubble_country_hymne').addClass('hide');
				$('#bubble_game_menue_bg').addClass('hide');
			});

			$('#button_startGame').click(function(){
				app.setGameState("intro");
			});

			$('#button_zurueck').click(function(){
				app.toggleMenue();
			});

			$('#button_levelDone').click(function(){
				app.levelDone();
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

			$('#button_hide_countryInfo').click(function(){
				$('#bubble_game_menue_bg').addClass('hide');
				$('#bubble_country_info').addClass('hide');
				$('#bubble_country_details').addClass('hide');
			});

			$('#button_info_details').click(function(){
				$('#bubble_country_details').removeClass('hide');
			});

			$('#button_hideIntroText').click(function(){
				app.hideInfoText();
			});


			console.log('Application erstellt');

			initEngines();
	};	

	function initEngines(){
		require(['engine','level'], function(Engine,Level){

			var canvas = document.getElementById('canvas');
			
			stage = new createjs.Stage(canvas);
			

			engine = new Engine(stage);
			level = new Level();

			app.setup(engine,level);
			level.setup(app,engine);
			engine.setup(app,level);

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