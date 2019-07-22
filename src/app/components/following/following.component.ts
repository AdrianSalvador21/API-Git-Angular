import {Component, OnInit, ViewChild} from '@angular/core';
import {GithubService} from '../../shared/github.service';
import {SearchUsersComponent} from '../search-users/search-users.component';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  @ViewChild('searchComponent') searchComponent: SearchUsersComponent;

  followingUsers = [];
  followingUsersNames = [];

  constructor(public githubService: GithubService) {
    this.githubService.getFollowingUser().subscribe(followingResponse => {
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
    this.githubService.unfollowUser(username.login).subscribe(unfollowResponse => {
    });

    this.searchComponent.unfollow(username);
  }

  addFollower(newFollower) {
    newFollower.follow = true;
    this.followingUsers.push(newFollower);
  }

  followUser(user, index) {
    this.searchComponent.followUser(user);
    this.followingUsers.splice(index, 1);
  }

}
