let mouseX = 0;
let mouseY = 0;

const checkClickColision = function(spritesInSceen,x,y){

    for(let i=spritesInSceen.length-1; i>=0;i--){
        let currentSpr = spritesInSceen[i];

        if((currentSpr.x < x && x < currentSpr.x+currentSpr.width)
            &&(currentSpr.y < y && y < currentSpr.y+currentSpr.height)){
                return currentSpr;
            }
    }
    return null;
    
}