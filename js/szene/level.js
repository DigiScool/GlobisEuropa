define(function(){

	var Level = Class.extend({

		init: function(app,engine,css){
			this.app = app;
			this.engine = engine;
			this.css = css;
		},

		startSzene: function(id){
			// DIV-Setup

 			this.engine.startAnimation('globi_transition_toLevel');
 			this.css.get('menue').removeClass('slideIn');
 			this.css.get('menue').addClass('slideOut');
 			this.css.get('button_zurueck').addClass('hide');
 			this.css.get('button_home').removeClass('hide');
 			this.css.get('headline').html('Level 1');

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