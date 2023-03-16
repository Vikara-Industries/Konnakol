// MENU SCEEN
const menuSceen = new Sceen();


const playBtnSpr = new Sprite(playBtnImg,150,100,300,150);

playBtnSpr.onClick = function(){
    currentSceene = makeNewPlaySceen();
    playSound(1000);
}


const menuBtnImg = new Image();
menuBtnImg.src = "./sprites/MenuButton.png";
const menuBtnSpr = new Sprite(menuBtnImg,150,350,300,150);

menuBtnSpr.onClick = function(){
    playSound(1000);
}


class Slider extends Sprite{
    constructor(){
        super(new Image(),150,350,300,150);
        //this.range = new SliderRange();
        this.dragger = new Dragger();
    }
}

class Dragger extends Sprite{
    constructor(){
        super(picImg,150,350,50,50);
        this.followMouse = false;
        this.minX = 150;
        this.maxX = 450;
    }
    update(){
        if(this.followMouse){
            if(mouseX <= this.maxX && mouseX >= this.minX){
                this.x = mouseX-this.width/2;
                changeVolume(this.x/this.maxX)
            }
        }
    }
    onClick = function(){
        this.followMouse = true;
    }

    onRelease = function(){
        this.followMouse = false;
        selectedSpr = null;
    }
}

menuSceen.sprites.push(playBtnSpr,menuBtnSpr,new Dragger());
//

// INIT
let currentSceene = menuSceen;