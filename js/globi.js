
/*
*	Globis Europa
*   =============
*   Objektbeschreibung und Container
*   für easel
*/


define(['lib/easeljs-0.6.0.min'],function(){

var Globi = Class.extend({

        init: function(){

            this.globi = new  createjs.Container();

             // Container
            this.globi = new createjs.Container();
            
            // Bauch
            var g1 = new createjs.Graphics();
                g1.setStrokeStyle(10);
                g1.beginStroke(createjs.Graphics.getRGB(141,211,237));
                g1.beginFill(createjs.Graphics.getRGB(27,156,247));
                g1.drawCircle(0,0,200);

            var s1 = new createjs.Shape(g1);
                s1.x = 0;
                s1.y = 0;

            
            // Augen    
            var g2 = new createjs.Graphics();
                g2.beginFill(createjs.Graphics.getRGB(255,255,255));
                g2.drawCircle(0,0,50);

            var s2 = new createjs.Shape(g2);
            var s3 = new createjs.Shape(g2);
                s2.x = -70; s2.y=-200;
                s3.x = 70;  s3.y=-200;

            var g3 = new createjs.Graphics();
                g3.beginFill(createjs.Graphics.getRGB(0,0,0));
                g3.drawCircle(0,0,35);

            var s4 = new createjs.Shape(g3);
            var s5 = new createjs.Shape(g3);
                s4.x = -70; s4.y=-185;
                s5.x = 70;  s5.y=-185;

            var g4 = new createjs.Graphics();
                g4.beginFill(createjs.Graphics.getRGB(255,255,255));
                g4.drawCircle(0,0,15);  

            var s6 = new createjs.Shape(g4);
            var s7 = new createjs.Shape(g4);
                s6.x = -75; s6.y=-210;
                s7.x = 75;  s7.y=-210;
            
            // Augen Brauen
            var brauen = new createjs.Graphics();
        
            brauen.beginFill(createjs.Graphics.getRGB(62,64,66));
            brauen.mt(7,20);
            brauen.bt(60,-10,60,-10,100,10);
            brauen.bt(20,-80,20,0,7,20);

            var s8 = new createjs.Shape(brauen);
            var s9 = new createjs.Shape(brauen);
            s8.x = -130;
            s8.y = -260;
            s9.x = 30;
            s9.y = -275;

            s9.skewX = 10;
            s9.rotation = 15;

            // Mund
            var mund = new createjs.Graphics();
            mund.setStrokeStyle(3);
            mund.beginStroke(createjs.Graphics.getRGB(11,66,104));
            mund.beginFill(createjs.Graphics.getRGB(255,255,255));
            mund.mt(-100,20);
            mund.bt(-50,120,50,120,100,20);
            mund.lt(-100,20);

            mund.mt(-82,50);
            mund.lt(-52,55);

            mund.mt(82,50);
            mund.lt(52,55);
            var s10 = new createjs.Shape(mund);
            s10.y = 20;
      
            // Alle Parts zusammenfügen

            this.globi.addChild(s1);
            this.globi.addChild(s2);
            this.globi.addChild(s3);
            this.globi.addChild(s4);
            this.globi.addChild(s5);            
            this.globi.addChild(s6);
            this.globi.addChild(s7); 
            this.globi.addChild(s8);
            this.globi.addChild(s9);   
            this.globi.addChild(s10);                 

            // Position im Raum
            this.globi.x = 500;
            this.globi.y = 400;

            this.posx = this.globi.x;
            this.posy = this.globi.y;
        },

        getContainer: function(){
            return this.globi;
        }
    });
     
    return Globi    

});