class Spawner extends Sprite{
    constructor(sceen,board, numOfDragables){
        super(new Image(),0,0,0,0)
        this.numOfDragables = numOfDragables;
        this.spawnAreaX = [0,600];
        this.spawnAreaY = [250,550];
        this.maxBoxes = 5;
        this.sceen = sceen
        this.board = board
    }

    runEveryBeat(){}
    runEveryBar(){
        for(let i = 0; i<this.numOfDragables;i++){
            this.spawnWithinArea();
        }
    }
    
    spawnWithinArea = function(){
        let spawnX = Math.floor(Math.random() * (this.spawnAreaX[1] - this.spawnAreaX[0])) + this.spawnAreaX[0];
        let spawnY = Math.floor(Math.random() * (this.spawnAreaY[1] - this.spawnAreaY[0])) + this.spawnAreaY[0];
        let numBoxes = Math.floor(Math.random() * this.maxBoxes);
        let spawnedBox = spawnDragableBox(numBoxes, spawnX, spawnY);
        spawnedBox.board = this.board;
        spawnedBox.boxes.forEach(box => {
            this.sceen.sprites.push(box);
        });
        this.sceen.sprites.push(spawnedBox);
    }
}
