/*
*	app.js
*	======
*	providing screen-functionality, like user inputs,
*	buttons, etc
*/


define(['jquery','engine'], function($,Engine){
	
	
	// Konstruktor , nothing to do here
	var App = Class.extend({
		
		init: function(){
		},

		setEngine : function(engine) {
			this.engine = engine;
		},

		loadSzene: function(name){
			this.engine.loadSzene(name);
		}
	}) ;

		

	return App
});
