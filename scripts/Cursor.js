import { CURSOR_SPEED, CURSOR_SIZE, BULLET_SPEED, BULLET_DURATION, BULLET_SIZE, COIN_SIZE } from './Constants.js';
import { Subject } from './Subject.js';

// Assets

class Cursor extends Subject {
  constructor(isImg){
    super();
    this.isImg = isImg;
    this.x = mouseX;
    this.y = mouseY;
    this.size = CURSOR_SIZE;
    this.bullets = [];
    this.isGaming = false;
    this.instantShoot();
    this.coin = new Coin();
  }

  draw(darkMode){
    if(!this.isGaming) return;
    this.slowFollow();
    fill(color(235, 151, 165));
    if(darkMode) fill(color('white'));
    ellipse(this.x, this.y, this.size);
    for (let bullet of this.bullets){
      if(bullet.visible && bullet.collision(this.size, this.x, this.y)){
        bullet.visible = false;
        this.gameOver();
        return;
      }
      bullet.draw(darkMode);
    }
    if(this.coin.visible && this.coin.collision(this.size, this.x, this.y)){
      this.coin.visible = false;
      this.scoreUp();
      setTimeout(()=>{this.coin = new Coin();}, 1000);
    }
    this.coin.draw(darkMode);

  }

  slowFollow(){
    var diffx = mouseX - this.x;
    var diffy = mouseY - this.y;
    this.x += diffx / CURSOR_SPEED;
    this.y += diffy / CURSOR_SPEED;
    if(this.x < 0) this.x = 0;
    else if(this.x > width) this.x = width;
    if(this.y < 0) this.y = 0;
    else if(this.y > height) this.y = height;
  }

  shoot(){
    const where = Math.floor(Math.random() * 4);
    let x, y;
    if(where == 0){
      x = Math.random() * width;
      y = 0;
    }else if(where == 1){
      x = 0;
      y = Math.random() * height;
    }else if(where == 2){
      x = Math.random() * width;
      y = height;
    }else{
      x = width;
      y = Math.random() * height;
    }

    const newBullet = new Bullet(x, y, this.x, this.y);
    this.bullets.push(newBullet);
    this.notifySubscribers('gun', this.remainingShots, x, y);
  }

  instantShoot(){
    if(this.isGaming){
      this.shoot();
      setTimeout(() => {
        this.instantShoot();
      }, BULLET_DURATION);
    }
    
  }

  gameOver(){
    console.log("Game Over TT");
    this.isGaming = false;
    this.notifySubscribers("gameOver");
  }

  scoreUp(){
    this.notifySubscribers("scoreUp", 1);
    console.log("SCORE : "+ this.score);
  }

  resetCursor(){
    this.bullets = [];
    this.isGaming = true;
    this.instantShoot();
    this.coin = new Coin();
  }
}

class Object {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.visible = true;
  }

  calcdis(x, y){
    return Math.sqrt( (this.x-x)**2 + (this.y-y)**2 );
  }

  collision(csize, x, y){
    return this.calcdis(x, y) < this.size/2 + csize/2;
  }
  
}

// Bullet
class Bullet extends Object {
  constructor(x, y, curx, cury){
    super(x, y);
    this.size = BULLET_SIZE;
    let dis = Math.sqrt( (curx-x)**2 + (cury-y)**2 );
    this.dirx = (curx - x) / dis;
    this.diry = (cury - y) / dis;
  }

  draw(darkMode){
    if(!this.visible) return;
    fill(color(0));
    if(darkMode) fill(color(150));
    noStroke();
    this.x += this.dirx * BULLET_SPEED;
    this.y += this.diry * BULLET_SPEED;
    ellipse(this.x, this.y, this.size);
  }
}

class Coin extends Object {
  constructor(){
    super(0, 0);
    this.newCoin();
    this.size = COIN_SIZE;
  }

  draw(){
    if(!this.visible) return;
    fill(color(255, 220, 0));
    ellipse(this.x, this.y, this.size);
  }

  newCoin(){
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.visible = true;
  }

  gameOver(){

  }
}


export { Cursor };
