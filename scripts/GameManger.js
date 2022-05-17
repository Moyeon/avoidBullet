import { Subject } from "./Subject";
import { Cursor } from "./Cursor";
import { ScoreDisplay } from "./ScoreDisplay";



class GM extends Subject{
    constructor(){
        super();
        this.panel = 0;
        this.cursor = new Cursor(false);
        this.score = new ScoreDisplay();
        this.cursor.subscribe(this.score);
    }

    draw(){
        background('#eeeeee');
        this.cursor.draw();
        this.score.draw();
    }
    gameOver(){

    }
    gameReset(){
        if(this.cursor.isGaming) return;
        this.cursor.resetCursor();
        this.score.resetScore();
    }
    
    optionOn(){
        if(this.panel==2) this.rankOff();
        this.panel = 1;
    }
    optionOff(){

    }
    rankOn(){
        if(this.panel==1) this.optionOff();
        this.panel = 2;
    }
    rankOff(){

    }

}

export {GM};