import { Component, OnInit } from '@angular/core';
import {GithubService} from '../../shared/github.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  followingUsers = [];

  constructor(public githubServer: GithubService) {
    this.githubServer.getFollowingUser().subscribe(followingResponse => {
      console.log(followingResponse);
      this.followingUsers = followingResponse;
    });
  }

  ngOnInit() {
  }

}
