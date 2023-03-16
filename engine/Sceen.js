class Sceen{
    constructor(){
        this.ui = [];
        this.sprites = [];
        this.isPaused = false;
    }
    update(){
        if(this.isPaused){
            this.showPauseOverlay();
        }
        else{
            for(let i=0;i<this.sprites.length;i++){
                this.sprites[i].update();
            }
            for(let i=0;i<this.ui.length;i++){
                this.ui[i].update();
            }
        }
    }
    addSprite(sprite){
        this.sprites.push(sprite)
    }
    pause(){
        this.isPaused = true;
    }
    unpauseSceen(){
        this.isPaused = false;
    }
    showPauseOverlay(){
        let pauseBg = new Sprite(pauseBgImg,350,100,300,400)
        let pauseMenuBtn = new Sprite(pauseMenuBtnImg,400,185,200,150)
        pauseMenuBtn.onRelease = function(){
            currentSceene = menuSceen;
        }
        let pauseReplayBtn = new Sprite(pauseReplayBtnImg,400,350,200,150)
        pauseReplayBtn.onRelease = function(){
            currentSceene = makeNewPlaySceen();
        }
        this.ui.push(pauseBg,pauseMenuBtn,pauseReplayBtn)
    }

}

class Sprite{
    constructor(image,x,y,w,h){
        this.image = image
        this.width = w;
        this.height = h;
        this.x = x;
        this.y = y;
        this.tags = [];
    }
    update(){}
    onClick(){}
    onRelease(){}
    addTag(tag){
        this.tags.push(tag);
    }
    hasTag(tag){
        for(let i=0; i<this.tags.length; i++){
            if(this.tags[i] == tag){
                return true
            }
        }
        return false
    }

    checkIfOverlaps(otherSpr){
       let centerX = this.x + this.width/2
       let centerY = this.y + this.height/2
       return otherSpr.checkContainsPoint(centerX,centerY)
    }
    checkContainsPoint(x,y){
        return(x > this.x && x < this.x+this.width
            && y > this.y && y < this.y+this.height)
    }
}


