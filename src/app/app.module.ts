import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from "angularfire2";
import {EpisodeService} from "./episode.service";
import { EpisodePipe } from './episode.pipe';
import { HomeComponent } from './home/home.component';

export const firebaseConfig = {
  apiKey: "AIzaSyDhCDxxEf5RCT6QsvfO5y5_k-IwFHxrVmc",
  authDomain: "hogcast-restore.firebaseapp.com",
  databaseURL: "https://hogcast-restore.firebaseio.com",
  projectId: "hogcast-restore",
  storageBucket: "hogcast-restore.appspot.com",
  messagingSenderId: "328594348973"
};

@NgModule({
  declarations: [
    AppComponent,
    EpisodePipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)

  ],
  providers: [EpisodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
