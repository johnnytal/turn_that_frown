var gameMain = function(game){
	window.addEventListener('deviceorientation', handleOrientation);
	idle = false;
	idleTime = 0;
};

gameMain.prototype = {  
    create: function(){
		blank = game.add.image (75, 25, 'blank');
		blank.y = game.world.centerY - blank.height / 2;
		
		smile = game.add.image (0, 0, 'smile');
		smile.anchor.set(0.5, 0.5);
		
		eyes = game.add.image (0, 0, 'eyes');
		eyes.anchor.set(0.5, 0.5);

		smile.scale.set(0.6, 0.6);
		
		smile.x = blank.x + 340;
		smile.y = blank.y + 390;
		
		eyes.x = blank.x + 340;
		eyes.y = blank.y + 175;

		laugh1Fx = game.add.audio('laugh1', 0.3, true);
		laugh2Fx = game.add.audio('laugh2', 0.3, true);
		
		cry1Fx = game.add.audio('cry1', 0.3, true);
		cry2Fx = game.add.audio('cry2', 0.3, true);
		
		haFx = game.add.audio('ha', 1, false);
		snoringFx = game.add.audio('snoring', 1, true);

        setTimeout(function(){
            try{
                StatusBar.hide;
            } catch(e){}   
            
            try{
            	window.plugins.insomnia.keepAwake();
        	} catch(e){}	
        }, 1000);
        
        initAd();
        
        setInterval(function(){
        	idleTime++;
        	
        	if (idleTime == 12){
        		snoringFx.play();
        	}
        }, 1000);
    }
};

function handleOrientation(event) {
  	var beta = event.beta;  // -180,180 Y
  	var gamma = event.gamma; // -90,90 X
  	
  	/* COLOR */
  	
  	color1 = Math.round(beta + 180);
  	color2 = Math.round(gamma + 90);
  	if (color1 > 255) color1 = 255;
  	
	try{
	    var r = color1;
        var g = Math.round((color1 / color2) * 10);
        var b = color2;
        
        if (g > 255) b = 255;
        else if (g < 0) b = 0;
	    
	    game.stage.backgroundColor = 'rgb(' + r + ',' + g + ',' + b +')';
    } catch(e){}
    
    /* EYES */
    
    eyes.x = blank.x + 340 + (gamma * 2);
    
    /* MOUTH */

  	smileAngle = beta / 180;
  	if (smileAngle < -1) smileAngle = -1;
  	else if (smileAngle > 1) smileAngle = 1;

	smile.scale.y = smileAngle;
	
	if (smile.scale.y > 0.05 && smile.scale.y < 0.5 && !laugh1Fx.isPlaying){ // laugh1
  		laugh1Fx.play();
  		
  		if (cry1Fx.isPlaying) cry1Fx.stop();
  		if (cry2Fx.isPlaying) cry2Fx.stop();
  		if (laugh2Fx.isPlaying) laugh2Fx.stop();
  		if (haFx.isPlaying) haFx.stop();
  		
  		laugh1Fx.volume = 0.3 + smile.scale.y;
  		
  		idle = false;
  	} 
  	
  	else if (smile.scale.y >= 0.5  && !laugh2Fx.isPlaying){ // laugh2
  		laugh2Fx.play();
  		
  		if (cry1Fx.isPlaying) cry1Fx.stop();
  		if (cry2Fx.isPlaying) cry2Fx.stop();
  		if (laugh1Fx.isPlaying) laugh1Fx.stop();
  		if (haFx.isPlaying) haFx.stop();
  		
  		laugh2Fx.volume = 0.3 + smile.scale.y;

  		idle = false;
  	} 
  	
  	else if (smile.scale.y < -0.05 && smile.scale.y > -0.5 && !cry1Fx.isPlaying){ // cry1
  		cry1Fx.play();
  		
  		if (laugh1Fx.isPlaying) laugh1Fx.stop();
  		if (laugh2Fx.isPlaying) laugh2Fx.stop();
  		if (cry2Fx.isPlaying) cry2Fx.stop();
  		if (haFx.isPlaying) haFx.stop();
  		
  		cry1Fx.volume = 0.3 + Math.abs(smile.scale.y);
  		
  		idle = false;
  	} 
  	
  	else if (smile.scale.y <= -0.5 && !cry2Fx.isPlaying){ // cry2
  		cry2Fx.play();
  		
  		if (laugh1Fx.isPlaying) laugh1Fx.stop();
  		if (laugh2Fx.isPlaying) laugh2Fx.stop();
  		if (cry1Fx.isPlaying) cry1Fx.stop();
  		if (haFx.isPlaying) haFx.stop();
  		
  		cry2Fx.volume = 0.3 + Math.abs(smile.scale.y);
  		
  		idle = false;
  	} 
  	
  	else if (smile.scale.y > -0.05 && smile.scale.y < 0.05){ // ha
  		if (laugh1Fx.isPlaying) laugh1Fx.stop();
  		if (laugh2Fx.isPlaying) laugh2Fx.stop();
  		if (cry1Fx.isPlaying) cry1Fx.stop();
  		if (cry2Fx.isPlaying) cry2Fx.stop();
  		
  		if (!haFx.isPlaying && !idle){
  			haFx.play();
  			idle = true;
  		}		
  	}
  	
  	idleTime = 0;
  	snoringFx.stop();
}


function initAd(){
    var admobid = {};

    admobid = {
        banner: 'ca-app-pub-9795366520625065/8080428948'
    };

    if(AdMob) AdMob.createBanner({
        adId: admobid.banner,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow: true
    });
}
