import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './home-page/weather/weather.component';
import { PugComponent } from './home-page/pug/pug.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeroBackgroundService } from './services/hero-background.service';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    WeatherComponent,
    PugComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    HeroBackgroundService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
