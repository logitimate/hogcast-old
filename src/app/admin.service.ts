import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import {Episode} from "./episode";

@Injectable()
export class AdminService {
  constructor(private af: AngularFire) { }
  createEpisode(episode) {
    this.af.database.object(`/episodes/episode-${episode.episodeNumber}`).set(episode);
  }
}
