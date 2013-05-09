/*
*	GlobisEuropa :: startup.js
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

define(['lib/class','lib/easeljs-0.6.0.min'], function(){
	require(['main']);
});