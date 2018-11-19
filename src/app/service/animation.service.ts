import {Injectable} from '@angular/core';

@Injectable()
export class AnimationService {

  public t = 0;
  private tStep =  0.01;
  public imageBySecoond = 60;
  public frameRate = 1 / 60;
  public animations = [];

  constructor() {
    this.animation();
  }

  animation() {

    this.animations.forEach(animation => {
        animation();
    });
    this.t += this.tStep;
    requestAnimationFrame(this.animation.bind(this));
  }

  add(animation) {
    this.animations.push(animation);
  }

  remove(animation) {
    this.animations.forEach((_animation, i) => {
      if (animation === _animation) {
        this.animations.splice(i, 1);
      }
    });
    this.animations.push(animation);
  }




}
