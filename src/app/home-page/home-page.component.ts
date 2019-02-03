import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Bill } from "../model/bill";
import { Weather } from "../model/weather";
import { Observable, timer } from "rxjs";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Track } from "../model/track";
import { FormsModule } from "@angular/forms";
import { HeroBackgroundService } from "../services/hero-background.service";
import {
  style,
  state,
  animate,
  transition,
  trigger,
  keyframes
} from "@angular/animations";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        // :enter is alias to 'void => *'
        style({ width: "0%", opacity: 0 }),
        // animate('300ms ease-in', style({ width: '100%', opacity: 1 }))
        animate(
          "300ms ease-out",
          keyframes([
            style({ width: "0%", opacity: 0 }),
            style({ width: "33%", opacity: 0.4 }),
            style({ width: "66%", opacity: 0.8 }),
            style({ width: "100%", opacity: 1 })
          ])
        )
      ]),
      transition(":leave", [
        // :leave is alias to '* => void'
        animate(
          "200ms ease-out",
          keyframes([
            style({ width: "100%", opacity: 1 }),
            style({ width: "66%", opacity: 0.66 }),
            style({ width: "33%", opacity: 0.33 })
          ])
        )
      ])
    ])
  ]
})
export class HomePageComponent implements OnInit {
  private gmailURL = "http://localhost:8888/api/GMail";
  private bills: Bill[] = [];
  private progress: number = 20;
  flipped = false;
  private speed = 0.66;
  searching = false;
  private googleSearch = false;
  //Skycons = require("skycons")(window);
  //private skycon = new this.Skycons({ color: "hsl(204, 86%, 53%)" });
  private weatherURL = "http://localhost:8888/api/Weather";
  private weatherReports: Weather[] = [];
  private track: Track = new Track();
  private spotifyToken: String = "";
  private searchString: String = "";
  private isOpen = "closed";
  private backgroundImage: String = "";
  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private heroBackgroundService: HeroBackgroundService) {}

  ngOnInit() {
    //console.log(this.gmailURL);
    //const Skycons = require("skycons")(window);
    this.spotifyToken = this.route.snapshot.fragment
      .split("=")[1]
      .split("&")[0];
    this.searching = true;
    this.httpClient.get<Bill[]>(this.gmailURL).subscribe(bills => {
      this.bills = bills;
      this.searching = false;
      subscribe.unsubscribe();
    });
    const subscribe = timer(0, 1).subscribe(() => {
      if (!this.flipped) {
        document.getElementsByTagName(
          "progress"
        )[0].value = this.progress += this.speed;
      } else {
        document.getElementsByTagName(
          "progress"
        )[0].value = this.progress -= this.speed;
      }
      if (this.progress > 100 || this.progress < 0) {
        this.flipped = !this.flipped;
      }
    });
    this.getWeather();
    this.spotify();
    timer(0, 30000).subscribe(() => this.spotify());
    this.newBackgroundImage();
  }

  private newBackgroundImage() {
    this.backgroundImage = `url(${this.heroBackgroundService.getRandomBackground()})`;
  }

  getWeather() {
    this.httpClient.get<Weather[]>(this.weatherURL).subscribe(weather => {
      this.weatherReports = weather;
      this.weatherReports[0].isToday = true;
      //console.table(this.weatherReports);
      //   setTimeout(() => {
      //     for (let i = 0; i < this.weatherReports.length; i++) {
      //       this.skycon.set("icon" + i, weather[i].icon);
      //     }
      //     this.skycon.play();
      //   }, 5);
    });
  }

  spotify() {
    setTimeout(() => {
      this.httpClient
        .get<Track>(
          "http://localhost:8888/api/Spotify/player/" + this.spotifyToken
        )
        .subscribe(track => {
          this.track = track;
          console.log(track);
        });
    }, 350);
  }

  pauseOrPlay() {
    if (this.track.isPlaying) {
      this.httpClient
        .put<Track>(
          "http://localhost:8888/api/Spotify/player/pause/" + this.spotifyToken,
          ""
        )
        .subscribe();
    } else {
      this.httpClient
        .put<Track>(
          "http://localhost:8888/api/Spotify/player/play/" + this.spotifyToken,
          ""
        )
        .subscribe();
    }
    this.track.isPlaying = !this.track.isPlaying;
  }

  next() {
    this.httpClient
      .put<Track>(
        "http://localhost:8888/api/Spotify/player/next/" + this.spotifyToken,
        ""
      )
      .subscribe(() => this.spotify());
  }

  previous() {
    this.httpClient
      .put<Track>(
        "http://localhost:8888/api/Spotify/player/previous/" +
          this.spotifyToken,
        ""
      )
      .subscribe(() => this.spotify());
  }

  search() {
    this.googleSearch = true;
    setTimeout(() => {
      window.location.href =
        "https://www.google.com/search?q=" + this.searchString;
    }, 500);
  }
}
