define(function(){

	var Level = Class.extend({

		init: function(app,engine,css){
			this.app = app;
			this.engine = engine;
			this.css = css;
		},

		startSzene: function(id){
			// DIV-Setup

 			console.log('Level-Loader gestartet. Lade Level '+id);
 			
 			// EVents

 			var self = this;

 			this.css.setCallback('button_home','click',function(){
 				
 				self.engine.startAnimation('globi_menue_popDown');


 				self.css.get('button_newGame').removeClass('hide');
 				self.css.get('button_home').addClass('hide')

 				self.css.get('headline').html('Hauptmen&uuml;');
 			})


		},

		stopSzene: function(){
 			this.app.szeneCallback('level','1');
 		}
	});



	return Level;

});