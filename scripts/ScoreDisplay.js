import { BULLET_SIZE, FONT_SIZE } from './Constants.js';


class ScoreDisplay {
  
  // TO DO
  constructor(){
    this.score = 0;
  }

  draw(darkMode){
    fill(color(255, 236, 236));
    if(darkMode)fill(color(20, 104, 90));
    textSize(FONT_SIZE);

    noStroke();
    textAlign(CENTER, CENTER);
    textSize(120);
    text(this.score, width/2, height/2);
  }

  turnOn(){
    if(this.shotLeft==0){
      this.reload = true;
      setTimeout(() => {
        this.turnOff();
      }, 500);
    }
  }
  turnOff(){
    if(this.shotLeft==0){
      setTimeout(() => {
        this.turnOn();
      }, 500);
    }
    this.reload = false;
  }

  resetScore(){
    this.score = 0;
  }

  addScore(scoreToAdd){
    this.score += scoreToAdd;
    console.log('addscore called : '+ this.score);
  }

  setBullets(numBullets){
    this.shotLeft = numBullets;
    if(this.shotLeft <= 0){
      this.turnOn();
    }
  }

  update(source, ...others){
    if(source=='scoreUp'){
      this.addScore(others[0]);
    }
  }
}

export { ScoreDisplay };
