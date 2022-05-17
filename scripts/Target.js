import { Subject } from './Subject';
import { Gun } from './Cursor';

import teddy from '../data/teddy.png';
import duck from '../data/duck.png';
import squirrel from '../data/squirrel.png';
import { MAX_TARGETS, TARGET_WIDTH } from './Constants';

class Target extends Subject {
 constructor(x, y, width){
  super();
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = 0;
  this.img;
  this.visible = true;
  this.points = 0;
 }

 getPoints(){
  if(this.visible)
    return this.points;
  return 0;
 }

 draw(){
  if(this.visible && this.img)
    image(this.img, this.x, this.y, this.width, this.height);
 }

 isHit(x, y){
  if(x >= this.x - this.width/2 && x<= this.x+this.width/2 && y >= this.y - this.height/2 && y<= this.y + this.height/2)
    return true;
  return false;
 }

 shoot(x, y){
  if(this.visible && this.isHit(x, y)){
    this.notifySubscribers("target", this.getPoints());
    this.visible = false;
  }
 }

 update(source, ...others){
  if(source == "gun"){
    this.shoot(others[1], others[2]);
  }
 }
}


// TO DO
class TeddyTarget extends Target{
  constructor(x, y, width){
    super(x, y, width);
    this.points = 1;
    this.img = loadImage(teddy, ()=>{
      this.height = this.width * this.img.height / this.img.width;
    });
    print(this);
  }
}

class DuckTarget extends Target{
  constructor(x, y, width){
    super(x, y, width);
    this.points = 3;
    this.img = loadImage(duck, ()=>{
      this.height = this.width * this.img.height / this.img.width;
    });
  }
}

class SquirrelTarget extends Target{
  constructor(x, y, width){
    super(x, y, width);
    this.points = 5;
    this.img = loadImage(squirrel, ()=>{
      this.height = this.width * this.img.height / this.img.width;
    });
  }
}

class TargetFactory {
  static getInstance(){
    if(!this.instance) this.instance = new TargetFactory();
    return this.instance;
  }
  getTargetsByName(targetNames, targetWidth, y){
    let tt =  targetNames.map((e, idx)=>{
      //const name = e.toLowerCase();
      const name = e;
      const numTargets = targetNames.length;
      if(name === "teddy") return new TeddyTarget(this.getX(idx, numTargets), y, targetWidth);
      if(name === "duck") return new DuckTarget(this.getX(idx, numTargets), y, targetWidth);
      if(name === "squirrel") return new SquirrelTarget(this.getX(idx, numTargets), y, targetWidth);
    });
    print(tt);
    return tt;
  }
  getRandomTargets(numTargets, targetWidth, y){
    let newarr = Array(numTargets).fill();
    print(newarr);
    const tnames = ['teddy', 'duck', 'squirrel'];
    newarr = newarr.map((e)=>{
      let rand = Math.floor(Math.random() * tnames.length);
      return tnames[rand];
    })
    return this.getTargetsByName(newarr, targetWidth, y);
  }
  getX(index, numTargets){
    return window.width / (MAX_TARGETS+1) * (index+1);
  }
}


export { Target, TargetFactory };
