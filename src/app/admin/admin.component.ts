import {Component, OnInit, Inject} from '@angular/core';
import {AdminService} from "../admin.service";
import * as firebase from 'firebase';
import {MdSnackBar} from "@angular/material";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  episode;
  progress: number;

  constructor(private adminService: AdminService, public snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.episode = {};
  };

  fileUpload(e) {
    console.log(e.target.files[0]);
    let file = e.target.files[0];
    let storageRef = firebase.storage().ref('episodes/' + file.name);
    let task = storageRef.put(file);
    task.on('state_changed',
      progress => {
        this.progress = (progress.bytesTransferred / progress.totalBytes) * 100;
        console.log(progress);
      },
      error => {
        this.snackBar.open("Episode upload failed");
      },
      () => {
        this.snackBar.open("Episode uploaded successfully");
      }
    )
  };

  createEpisode() {
    this.episode.publishDate = new Date();
    this.episode.link = `https://firebasestorage.googleapis.com/v0/b/hogcast-restore.appspot.com/o/episodes%2FHogCast${this.episode.episodeNumber}.mp3?alt=media&token=0524e84d-3d7f-4f59-a750-f4eff598e4bf`;
    this.episode.imageLink = "https://s3.amazonaws.com/thehogcast/profilePicture.png";
    this.adminService.createEpisode(this.episode);
  };
}
