const BoxW = 50;
const BoxH = 50;

function chooseDragableSprite(numBoxes){
    switch (numBoxes) {
        case 1:
            return dragableImg
        case 2:
            return dragable2Img
        case 3:
            return dragable3Img
        case 4:
            return dragable4Img
        default:
            return dragableImg
    }
}

class Dragable extends Sprite{
    constructor(numBoxes,x,y,w,h){

        super(chooseDragableSprite(numBoxes),x,y,w*numBoxes,h);
        this.board;
        this.followMouse = false;
        this.numBoxes = numBoxes;
        this.boxes = [];
        this.tags = ["dragable"]
    }
    addBox = function(box){
        if(this.boxes.length < this.numBoxes){
            this.boxes.push(box)
        }else{console.log("Cannot add box, slots filled")}
    }

    onClick = function(){
        this.followMouse = true;
    }

    onRelease = function(){
        this.followMouse = false;
        if(this.checkBoxesOverlap()){
            this.dropBoxesIntoBoard()
            this.tags.push("delete")
        }
        selectedSpr = null;
    }
    
    update = function(){
        if(this.followMouse){

            this.x = mouseX-this.width/2;
            this.y = mouseY-this.height/2;
            for(let i=0; i< this.boxes.length;i++){
                this.boxes[i].x = this.x + i*BoxW;
                this.boxes[i].y = this.y;
            }

        }
    }

    checkBoxesOverlap(){
        for(let i=0;i<this.boxes.length;i++){
            let box = this.boxes[i]
            let slot = this.board.getSlotAtPosition(box.x+box.width/2,box.y+box.height/2)
            if(slot == null || slot.getBeatBox() != null){return false}
        }
        return true;
    }
    dropBoxesIntoBoard(){
        for(let i=0;i<this.boxes.length;i++){
            let box = this.boxes[i]
            let slot = this.board.getSlotAtPosition(box.x+box.width/2,box.y+box.height/2);

            slot.addBeatBox(box);
        }
        this.boxes = [];
    }
}


class BeatBox extends Sprite{
    constructor(image,x,y,w,h){
        super(image,x,y,w,h);
        this.beats = [];
        this.soundsPerBeat = 0;
    }

    getBeats = function(){
        let beats = [...this.beats];
        
        return beats;
    }
    setBeats = function(beats){
        this.beats = beats;
        this.soundsPerBeat = this.beats.length;
    }

}

const generateRandomBeatBox = function(x,y){
    let box = new BeatBox(picImg,x,y,BoxW,BoxH);

    let numBeats = Math.floor(Math.random() * 4);
    switch(numBeats){
        case 0:
            box.image = box1BeatImg;
            box.setBeats([0]);
            break;
        case 1:
            box.image = box2BeatImg;
            box.setBeats([0,0.5]);
            break;
        case 2:
            box.image = box3BeatImg;
            box.setBeats([0,0.3,0.6]);
            break;
        case 3:
            box.image = box4BeatImg;
            box.setBeats([0,0.25,0.50,0.75]);
            break;
        
    }

    return box
}

const spawnDragableBox = function(numSlots,x,y){
    let dragger = new Dragable(numSlots,x,y,BoxW,BoxH);

    for(let i=0; i < numSlots; i++){
        dragger.addBox(generateRandomBeatBox(x+i*BoxW,y));
    }

    return dragger;
    
}