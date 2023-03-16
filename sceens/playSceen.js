const makeNewPlaySceen = function(){
    let sceen = new Sceen();
    let mngr = new playscMenager(sceen);
    mngr.populateBoard();
    mngr.displayHp();
    mngr.displayScore();
    return sceen;
}


class playscMenager extends Sprite {
    constructor(sceen) {
        super(new Image(), 0, 0, 0, 0)
        this.sceen = sceen
        this.board = new Board(8, 0, 50, 50, 50);
        this.beater = new BeatSelector(this.board);
        this.spawner = new Spawner(this.sceen,this.board, 8);
        this.metronome = new Metronome(1250, 8);
        this.metronome.listeners = [this,this.beater, this.spawner]
        this.isChangingNextBeat = false;
        this.barsSinceStart = 0;

        this.score = 0;
        this.scoreDigitTens = new Sprite(new Image(),50,0,50,50);
        this.scoreDigitOnes = new Sprite(new Image(),100,0,50,50);

        this.hp = 10;
        this.hpDigitTens = new Sprite(new Image(),450,0,50,50);
        this.hpDigitOnes = new Sprite(new Image(),500,0,50,50);
        this.sceen.ui.push(this, this.beater,this.metronome, this.hpDigitTens, this.hpDigitOnes, this.scoreDigitTens, this.scoreDigitOnes);
    }
    init(){
        
    }
    update = function () {

        this.removeToBeDeletedSprs()

    }
    removeToBeDeletedSprs() {
        for (let i = 0; i < this.sceen.sprites.length; i++) {
            let sprite = this.sceen.sprites[i]
            if (sprite.hasTag("delete")) {
                this.sceen.sprites.splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < this.sceen.ui.length; i++) {
            let sprite = this.sceen.ui[i]
            if (sprite.hasTag("delete")) {
                this.sceen.ui.splice(i, 1);
                i--;
            }
        }
    }
    runEveryBeat() {
        if(this.beater.currentSlot!=null){
            if(this.beater.currentSlot.beatBox == null){
                this.reduceHP();
                this.displayHp();
            }else if(this.beater.currentSlot.beatBox.soundsPerBeat>0){
                this.score++;
                this.displayScore();
            }
        }
    }
    displayHp(){
        let hpStr = this.hp.toString();
        if(this.hp >9){
            this.hpDigitTens.image = digitImg[parseInt(hpStr[0])];
            this.hpDigitOnes.image = digitImg[parseInt(hpStr[1])];
        }else{
            this.hpDigitTens.image = new Image();
            this.hpDigitOnes.image = digitImg[parseInt(hpStr[0])];
        }
    }
    displayScore(){
        let scoreStr = this.score.toString();
        if(this.score >9){
            this.scoreDigitTens.image = digitImg[parseInt(scoreStr[0])];
            this.scoreDigitOnes.image = digitImg[parseInt(scoreStr[1])];
        }else{
            this.scoreDigitTens.image = new Image();
            this.scoreDigitOnes.image = digitImg[parseInt(scoreStr[0])];
        }
    }

    runEveryBar() {
        this.barsSinceStart++
        if(this.barsSinceStart==3){this.isChangingNextBeat=true}
        
        if(this.isChangingNextBeat){
            this.isChangingNextBeat =false;
            this.changeDificulty(16,625)
        }
        this.board.setupBoard();
        this.addSlotsToDrawList();
        

    }
    addSlotsToDrawList() {
        for (let i = 0; i < this.board.slots.length; i++) {
            if (this.board.slots[i].beatBox != null) {
                this.sceen.addSprite(this.board.slots[i].beatBox)
            }
        }
    }
    populateBoard() {
        this.board.setupBoard()
        this.board.slots.forEach(element => {
            this.sceen.ui.unshift(element)
        });
    }

    changeDificulty(numSlots,msPerBeat){
        this.metronome.setMsPerBeat(msPerBeat)
        this.metronome.setBeatsPerBar(numSlots)
        this.board.setNumSlots(numSlots)
        this.populateBoard();
    }

    reduceHP(){
        this.hp --;
        if(this.hp < 1){
            this.sceen.pause()
        }
    }
}

