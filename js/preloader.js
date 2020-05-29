var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
        this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '0%',{
             font: '25px', fill: 'green', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);

        this.game.load.image('blank', 'images/blank.png');
        this.game.load.image('smile', 'images/smile.png');
        this.game.load.image('eyes', 'images/eyes.png');
        
        this.game.load.audio('cry1', 'audio/cry1.ogg'); 
        this.game.load.audio('cry2', 'audio/cry2.ogg'); 
        this.game.load.audio('laugh1', 'audio/laugh1.ogg'); 
        this.game.load.audio('laugh2', 'audio/laugh2.ogg'); 
        this.game.load.audio('ha', 'audio/ha.ogg'); 
        this.game.load.audio('snoring', 'audio/snoring.ogg'); 
    },
    
    create: function(){
        this.game.state.start("Game");  
    }
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = progress+"%";
};
