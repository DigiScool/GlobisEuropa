define(['jquery'], function($){
	
	var CSS = Class.extend({

		init: function(){

		},

		clear: function(){

			$('#gameContainer').children().addClass('hide');
		},

		show: function(name){

			var name = '#'+name;
			$(name).removeClass('hide');
		},

		hide: function(name){
			var name = '#'+name;
			$(name).removeClass('hide');
		},

		setCallback: function(name,eventName,callback){
			var idname = '#'+name;
			$(idname).on(eventName,callback);
		},

		get: function(name){
			
			var elementName = '#'+name;
			var element = $(elementName);
			return element;
		}
	
	});	

	return CSS
});