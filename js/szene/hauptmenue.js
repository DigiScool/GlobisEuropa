define(function(){

 	var Hauptmenue = Class.extend({

 		init: function(app,engine,css){
 			this.engine = engine;
 			this.css = css;
 			this.app = app;

 			this.szeneEnd = false;

 			this.texte = [
 				" <br /> Lerne die Länder um Deutschland</br> kennen. Finde heraus " +
 				", welche Staaten <br /r> am atlantischen Ozean liegen, <br 7> oder welches" +
 				" das höchste Gebirge <br /> dieser  Region ist"
 			];
 		},

 		startSzene: function(){
 			this.engine.initHauptmenue();
			this.engine.startAnimation('globi_idle');

 			// DIV-Setup

 			this.css.show('headBar');
 			this.css.show('canvasContainer')
 			
 			this.css.show('footBar');

 			// Button-Setup
 			// Scope
 			var self = this;

 			this.css.show('button_newGame');

 			this.engine.setCallback('click',function(){

 				self.engine.disableEvents('globiContainer');
 				self.engine.stopAnimation('globi_idle');
 				self.engine.startAnimation('globi_menue_popUp');

 				self.css.get('menue').addClass('slideIn');
 				self.css.get('menue').removeClass('slideOut');
 				self.css.get('button_newGame').addClass('hide');
 				self.css.get('button_zurueck').removeClass('hide');
 				self.css.get('headline').html('Neues Spiel');
 				self.css.get('menue_text').html(self.texte[0]);


 			});

 			this.css.setCallback('menue_picture_area','click',function(){
 				self.stopSzene();
 				console.log('babum');
 			})

 			this.css.setCallback('button_zurueck','click',function(){

 				self.engine.startAnimation('globi_menue_popDown');

 				self.css.get('menue').removeClass('slideIn');
 				self.css.get('menue').addClass('slideOut');
 				self.css.get('button_newGame').removeClass('hide');
 				self.css.get('button_zurueck').addClass('hide')

 				self.css.get('headline').html('Hauptmen&uuml;');
 			});


 			// EventListener
 			this.css.setCallback('button_newGame','click', function(){

 				self.engine.disableEvents('globiContainer');
 				self.engine.stopAnimation('globi_idle');
 				self.engine.startAnimation('globi_menue_popUp');

 				self.css.get('menue').addClass('slideIn');
 				self.css.get('menue').removeClass('slideOut');
 				self.css.get('button_newGame').addClass('hide');
 				self.css.get('button_zurueck').removeClass('hide');
 				self.css.get('headline').html('Neues Spiel');
 				self.css.get('menue_text').html(self.texte[0]);
 			});



 		},

 		stopSzene: function(){
 			this.app.startSzene('level','1');
 			console.log('babam');
 		}

 	});

 	return Hauptmenue

});