const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let selectedSpr = null;

let globalMsPerBeat = null; 

function main(){
    requestAnimationFrame(main);

    update(currentSceene);
    pushSelectedToTop(currentSceene)
    drawSprites(currentSceene);

}

function update(s){
    s.update();
}

function pushSelectedToTop(s){
    if(selectedSpr !=null && selectedSpr.hasTag('dragable')){
        for(let i=0; i<s.sprites.length;i++){
            if(selectedSpr === s.sprites[i] && i < s.sprites.length-1){
                s.sprites.push(...s.sprites.splice(i-selectedSpr.boxes.length,selectedSpr.boxes.length+1))
                break;
            }
        }
    }
}

function drawSprites(s){
    ctx.clearRect(0,0,canvasWidth,canvasHeight);

    drawFromGroup(s.sprites);
    drawFromGroup(s.ui);
}

function drawFromGroup(sprGroup){
    for(i=0;i<sprGroup.length;i++){
        let currentSpr = sprGroup[i]
        ctx.drawImage(currentSpr.image,currentSpr.x,currentSpr.y,currentSpr.width,currentSpr.height);
    }
}



canvas.addEventListener("mousedown",function(event){
    let x = event.offsetX;
    let y = event.offsetY;
    let sprsAndUi = currentSceene.ui.slice(0,currentSceene.ui.length)
    sprsAndUi.push(...currentSceene.sprites.slice(0,currentSceene.sprites.length))

    selectedSpr = checkClickColision(sprsAndUi,x,y);
    if(selectedSpr == null){}
    else{selectedSpr.onClick()}
})

canvas.addEventListener("mouseup",function(){
    if(selectedSpr == null){}
    else{selectedSpr.onRelease()}
})

canvas.addEventListener("mousemove", function(event){
    mouseX = event.offsetX;
    mouseY = event.offsetY;
})

main()