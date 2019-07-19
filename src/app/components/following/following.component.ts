import { Component, OnInit } from '@angular/core';
import {GithubService} from '../../shared/github.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  followingUsers = [];
  followingUsersNames = [];

  constructor(public githubService: GithubService) {
    this.githubService.getFollowingUser().subscribe(followingResponse => {
      console.log(followingResponse);
      this.followingUsers = followingResponse;
      this.followingUsers.forEach(user => {
        user.follow = true;
        this.followingUsersNames.push(user.login);
      });
    });
  }

  ngOnInit() {
  }

  unfollowUser(username, i) {
    this.followingUsers[i].follow = false;
    this.githubService.unfollowUser(username).subscribe(unfollowResponse => {
      console.log(unfollowResponse);
    });
  }

  addFollower(newFollower) {
    newFollower.follow = true;
    this.followingUsers.push(newFollower);
  }

}
