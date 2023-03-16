
class Slot extends Sprite{
    constructor(x,y,w,h){
        super(slotImg,x,y,w,h);
        
        this.beatBox = null;
    }
    addBeatBox = function(beatBox){
        this.beatBox = beatBox
        beatBox.x = this.x;
        beatBox.y = this.y;
    }
    getBeatBox = function(){
        return this.beatBox
    }
    empty = function() {
        if(this.beatBox != null){
            this.beatBox.tags.push('delete')
        }
            this.beatBox = null;
    }
}


class Board{
    constructor(numSlots,x,y,slotW,slotH){
        this.x = x;
        this.y = y;
        this.slotH = slotH;
        this.slotW = slotW
        this.slots = [];
        for(let i=0;i<numSlots;i++){
            this.slots.push(new Slot(x+i*slotW,y,this.slotW,this.slotH))
        }
    }
    setupBoard = function(){
        this.slots.forEach(slot => {
            slot.empty()

            if(Math.random() > 0.8){
            slot.addBeatBox(new BeatBox(box0BeatImg,0,0,BoxW,BoxH));
            }
        });
        this.slots[0].addBeatBox(new BeatBox(box0BeatImg,0,0,BoxW,BoxH));
        
    }

    fillSlot = function(listIndex, beatBox){
        this.slots[listIndex].addBeatBox(beatBox);
    }

    getSlotFromList = function(index){
        return this.slots[index]
    }

    getSlotAtPosition(x,y){
        for(let i = 0;i<this.slots.length;i++){
            let slot = this.slots[i]
            if(slot.checkContainsPoint(x,y)){
                return slot;
            }
        }
        return null;
    }
    setNumSlots(num){
        this.slots.forEach(slot => {
            slot.addTag('delete')
            slot.empty();
        });
        this.slots = []
        for(let i=0;i<num;i++){
            this.slots.push(new Slot(this.x+i*this.slotW,this.y,this.slotW,this.slotH))
        }
        this.setupBoard();

    }
    
}



class BeatSelector extends Sprite{
    constructor(board){

        super(selectorImg,board.x,board.y,board.slotH,board.slotW);
        this.board = board;
        this.positionOnBoard = -1;
        this.msPerSlot = 625;
        this.lastBeat = 0;
        this.currentSlot = null;
        this.currentSlotTimeStart;
        this.currentSlotBeats = [];
    }

    update = function(){
        if(this.currentSlot != null && this.currentSlot.beatBox != null){
            this.playBeatsFromSlot();
        }
    }
    runEveryBeat(){

        this.positionOnBoard++;
        this.currentSlot = this.board.getSlotFromList(this.positionOnBoard);
        this.x = this.currentSlot.x;

        if (this.currentSlot.beatBox == null) { }
        else {
            this.currentSlotTimeStart = Date.now();
            this.currentSlotBeats = this.currentSlot.beatBox.getBeats();
        }
    }
    runEveryBar(){
        this.positionOnBoard = -1;
        this.currentSlot = null;
        //this.currentSlot = this.board.slots[0]
    }

    playBeatsFromSlot = function(){
        if(this.currentSlotBeats.length >0){
            if(Date.now()-this.currentSlotTimeStart >= this.currentSlotBeats[0]*globalMsPerBeat){
                playSound(globalMsPerBeat/this.currentSlot.beatBox.soundsPerBeat);
                this.currentSlotBeats.shift();
            }       
        }
    }
}
