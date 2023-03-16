class Metronome extends Sprite{
    constructor(msPerBeat,beatsPerBar){
        super(new Image(),0,0,0,0)
        this.listeners = [];
        this.msPerBeat = msPerBeat;
        globalMsPerBeat = msPerBeat;
        this.beatsPerBar = beatsPerBar
        this.msPerBar = this.msPerBeat*this.beatsPerBar
        this.lastBeat = 0;
        this.lastBar = 0;
    }
    update(){
        
        if(Date.now() >= this.lastBeat+this.msPerBeat){
            if(Date.now() >= this.lastBar+this.msPerBar){
                this.runEveryBar();
                this.lastBar = Date.now();
            }else{      
                this.runEveryBeat();
                this.lastBeat = Date.now();
            }
        }
    }
    runEveryBeat(){
        this.listeners.forEach(listener => {
            listener.runEveryBeat();
        });
    }
    runEveryBar(){
        this.listeners.forEach(listener => {
            listener.runEveryBar();
        });
    }
    addListener(listener){
        this.listeners.push(listener);
    }
    setMsPerBeat(msPbeat){
        this.msPerBeat = msPbeat;
        this.msPerBar = this.msPerBeat*this.beatsPerBar
        globalMsPerBeat = this.msPerBeat;
    }
    setBeatsPerBar(beatsPerBar){
        this.beatsPerBar = beatsPerBar;
        this.msPerBar = this.msPerBeat*this.beatsPerBar
    }

}