
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

define(['class'], function(){
	require(['app']);
});