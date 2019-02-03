import { Component, OnInit, Input } from "@angular/core";
//import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, timer } from "rxjs";
import { Weather } from 'src/app/model/weather';
//import * as Skycons from 'skycons';
@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"]
})
export class WeatherComponent implements OnInit {
  
  @Input() weather: Weather = new Weather();
  @Input() number: number;
  private showWeather = true;
  private weatherColor: String = "hsl(204, 86%, 53%)";
  Skycons = require("skycons")(window);
  
  constructor() {}

  ngOnInit() {
    let temps = this.weather.temperature.split("#").join("").split(" - ").map(temp => +temp);
    let avg: number = temps[0];
    if (temps.length > 1) {
      avg = (temps[0] + temps[1]) / 2;
    }

    if (avg > 28 && avg < 35) {
      this.weatherColor = "hsl(171, 100%, 41%)";
    }
    else if (avg > 35) {
      this.weatherColor = "hsl(28, 100%, 67%)";
    }
    let skycon = new this.Skycons({ color: "hsl(0, 0%, 96%)" });
    setTimeout(() => skycon.set("icon" + this.number, this.weather.icon), 5);
    skycon.play();
    this.weather.temperature = this.weather.temperature.split('#').join('\xB0F');
    //console.log(this.weather);
  }


}
