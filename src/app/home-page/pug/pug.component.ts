import { Component, OnInit } from "@angular/core";
import { Pug } from "../../model/pug";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Component({
  selector: "app-pug",
  templateUrl: "./pug.component.html",
  styleUrls: ["./pug.component.css"]
})
export class PugComponent implements OnInit {
  private pug: Pug = new Pug();
  private loading = true;
  private pugUrl: string = "http://localhost:8888/api/Pug";
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getPug();
  }

  getPug() {
    this.loading = true;
    this.httpClient.get<Pug>(this.pugUrl).subscribe(pug => {
      this.pug = pug;
      this.loading = false;
    });
  }
}
