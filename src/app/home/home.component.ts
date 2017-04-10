import { Component, OnInit } from '@angular/core';
import {EpisodeService} from "../episode.service";
import {FirebaseListObservable} from "angularfire2";
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  episodes: FirebaseListObservable<any>;
  selectedEpisode : any;
  lastEpisode : number;
  audio;

  constructor(private episodeService: EpisodeService) {
    this.audio = new Audio();
  }

  selectEpisode(id){
    this.selectedEpisode = _.filter(this.episodes, episode => episode.episodeNumber == id)[0];
    this.audio.src = this.selectedEpisode.link;
    this.audio.load();
    this.playEpisode();
  };

  playEpisode(){
    this.audio.play();
  };

  nextEpisode() {
    console.log(this.selectedEpisode.episodeNumber, this.lastEpisode);
    if(this.selectedEpisode.episodeNumber < this.lastEpisode)
      this.selectEpisode(_.toNumber(this.selectedEpisode.episodeNumber) + 1);
    else {
      this.selectEpisode(1);
    }
  };

  previousEpisode() {
    if(this.selectedEpisode.episodeNumber !== 1)
      this.selectEpisode(_.toNumber(this.selectedEpisode.episodeNumber) - 1);
    else {
      this.selectEpisode(this.lastEpisode);
    }
  };


  ngOnInit() {
    this.episodeService.episodes
      .subscribe(data => {
        this.lastEpisode = _.max(_.map(data => data.episodeNumber));
        this.episodes = data
      });

    this.episodeService.selectedEpisode
      .subscribe(data => {
        this.selectedEpisode = data[0];
        this.audio.src = this.selectedEpisode.link;
        this.audio.load()
      });

  }
}
