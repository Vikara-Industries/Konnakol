const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
const audio = new Audio("../boom.wav");
//const soundsLow = [soundLow2];
const soundsMid = [soundMid1,soundMid3,soundMid5];
const soundsHigh = [soundHigh2,soundHigh4];
const soundsOrder = [soundsMid,soundsMid,soundsHigh,soundsMid,soundsMid,soundsMid,soundsHigh];
let placeInSoundsOrder = 0;

let Sourcee = null;


const antiPopNode = audioCtx.createGain();
antiPopNode.gain.value = 1;
antiPopNode.connect(audioCtx.destination)


const volumeNode = audioCtx.createGain();
volumeNode.gain.value = 0.5;
volumeNode.connect(antiPopNode);




const changeVolume = function(volume){
    volumeNode.gain.value = volume;
}

const playSound = function(soundLen){
    let length = soundLen/1000
    if(Sourcee != null){
        Sourcee[0].disconnect();
    }
 
    antiPopNode.gain.setValueAtTime(1,audioCtx.currentTime+0.01)
    let audio = getNextSound();
    let source = audioCtx.createMediaElementSource(audio);
    source.connect(volumeNode);
    audio.play()
    antiPopNode.gain.exponentialRampToValueAtTime(0.1, audioCtx.currentTime+length)
    
    Sourcee=[source]
}

const getRandomSound = function(sounds){
    return sounds[Math.floor(Math.random()* sounds.length)];
    
}

const getNextSound = function(){
    placeInSoundsOrder++;
    if(placeInSoundsOrder == soundsOrder.length){
        placeInSoundsOrder = 0;
    }
    return getRandomSound(soundsOrder[placeInSoundsOrder]);
}
