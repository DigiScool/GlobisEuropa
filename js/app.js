/*
*	app.js
*	======
*	providing screen-functionality, like user inputs,
*	buttons, etc
*/


define(['jquery','engine'],function($,Engine){
	
	var engine;
	var canvas;

	console.log('Application wird intitialisiert');

	// initialisation
	setEngine();


	function setEngine(){
		canvas = document.getElementById('canvas');
		engine = new Engine(canvas);
		engine.run();
		engine.addGlobi();
		
	}
});
