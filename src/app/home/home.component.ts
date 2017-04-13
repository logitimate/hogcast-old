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
  paused: boolean;
  audio;
  position;
  elapsed;
  duration;

  constructor(private episodeService: EpisodeService) {
    this.audio = new Audio();
  }

  selectEpisode(id){
    this.selectedEpisode = _.filter(this.episodes, episode => episode.episodeNumber == id)[0];
    this.audio.src = this.selectedEpisode.link;
    this.audio.load();
    this.playPauseEpisode();
  };

  playPauseEpisode(){
    if(this.audio.paused) {
      this.paused = true;
      this.audio.play()
    } else {
      this.paused = false;
      this.audio.pause()
    }
  };

  nextEpisode() {
    if(Number(this.selectedEpisode.episodeNumber) !== this.lastEpisode){
      this.selectEpisode(_.toNumber(this.selectedEpisode.episodeNumber) + 1);
    }
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

  handleTimeUpdate() {
    const elapsed =  this.audio.currentTime;
    const duration =  this.audio.duration;
    this.position = (elapsed / duration) * 100;
    this.elapsed = this.formatTime(elapsed);
    this.duration = this.formatTime(duration);
  }

  formatTime(seconds) {
    let minutes:any = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }

  ngOnInit() {
    this.episodeService.episodes
      .subscribe(data => {
        this.lastEpisode = Number(_.max(_.map(data, episode => episode.episodeNumber)));
        this.episodes = data;
      });

    this.episodeService.selectedEpisode
      .subscribe(data => {
        this.selectedEpisode = data[0];
        this.audio.src = this.selectedEpisode.link;
        this.audio.load()
      });

    this.audio.ontimeupdate = this.handleTimeUpdate.bind(this);
  }
}
