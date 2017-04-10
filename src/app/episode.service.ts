import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import 'rxjs/add/operator/map';

@Injectable()
export class EpisodeService {
  episodes:  FirebaseListObservable<any>;
  getSelectedEpisode: Function;
  selectedEpisode : FirebaseListObservable<any>;

  constructor(af: AngularFire) {
    this.episodes = af.database.list('/episodes');
    this.selectedEpisode = af.database.list('/episodes', {
      query: {
      limitToLast: 1
      }
    });

    this.getSelectedEpisode = id => {
      this.selectedEpisode = af.database.list(`/episodes/episode-${id}`);
    }
  }
}
