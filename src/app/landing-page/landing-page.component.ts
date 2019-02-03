import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  private spotifyCodeUrl = 'http://localhost:8888/api/Spotify';
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get<string>(this.spotifyCodeUrl).subscribe(url => window.location.href = url);
  }

}
