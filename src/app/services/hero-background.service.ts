import { Injectable } from "@angular/core";


@Injectable({
  providedIn: "root"
})
export class HeroBackgroundService {
  private backgrounds: String[] = [
    "/assets/images/0.jpg",
    "/assets/images/1.jpg",
    "/assets/images/2.jpg",
    "/assets/images/3.png",
    "/assets/images/4.png",
    "/assets/images/5.png",
    "/assets/images/6.jpg",
    "/assets/images/pixel-cityscape.jpg",
    "/assets/images/temple.jpg",
    "https://i.imgur.com/tYKscBZ.gif",
    "https://i.pinimg.com/originals/5f/ee/8e/5fee8e4a9fea271529cfd8828dd990d5.gif",
    "https://i.redd.it/ijtu374660uz.gif",
    "http://www.espaciobyte.org/exp/117/hd/12.gif",
    "https://i2.wp.com/media.boingboing.net/wp-content/uploads/2015/09/coffee_in_rain_by_kirokaze-d98qb8z.gif?fit=1100%2C582&ssl=1"
  ];
  private lastUsedBackgrounds: number[] = [];

  public getRandomBackground(): String {
    // Don't reuse the most recent three backgrounds
    let index = this.getRandomIndex();
    while(this.lastUsedBackgrounds.indexOf(index) > 0) {
      index = this.getRandomIndex();
    }
    if(this.lastUsedBackgrounds.length == 3) {
      this.lastUsedBackgrounds.pop();
    }
    this.lastUsedBackgrounds.unshift(index);
    return this.backgrounds[index];
  }

  private getRandomIndex() {
    return Math.floor(Math.random() * this.backgrounds.length);
  }

  constructor() {}
}
