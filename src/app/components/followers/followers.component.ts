import { Component, OnInit } from '@angular/core';
import {GithubService} from '../../shared/github.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  followers: any[] = [];

  constructor(public githubService: GithubService) {
    this.githubService.followersUser().subscribe(followersResponse => {
      this.followers = followersResponse;
    });
  }

  ngOnInit() {
  }

}
