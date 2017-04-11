import { Component, OnInit } from '@angular/core';
import {AdminService} from "../admin.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  episode: Object;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.episode = {};
  };

  createEpisode(){
    this.adminService.createEpisode(this.episode);
  };
}
