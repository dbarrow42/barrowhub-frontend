import { Component, OnInit } from "@angular/core";
import { Track } from "../../model/track";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { Observable, timer } from "rxjs";
@Component({
  selector: "app-spotify",
  templateUrl: "./spotify.component.html",
  styleUrls: ["./spotify.component.css"]
})
export class SpotifyComponent implements OnInit {
  private track: Track = new Track();
  private spotifyToken: String = "";

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit() {
    this.spotifyToken = this.route.snapshot.fragment
      .split("=")[1]
      .split("&")[0];

    this.spotify();
    timer(0, 10000).subscribe(() => this.spotify());
  }

  spotify() {
    setTimeout(() => {
      this.httpClient
        .get<Track>(
          "http://localhost:8888/api/Spotify/player/" + this.spotifyToken
        )
        .subscribe(track => {
          this.track = track;
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
}
