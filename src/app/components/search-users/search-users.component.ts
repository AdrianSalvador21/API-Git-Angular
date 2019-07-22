import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GithubService} from '../../shared/github.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {
  @Input() followingUsers: any[];
  @Output() followUserEmitter = new EventEmitter();
  searchResult: any = [];

  constructor(public githubService: GithubService) {
  }

  ngOnInit() {
  }

  search(inputSearch) {
    this.searchResult = [];
    this.githubService.searchUser(inputSearch.value).subscribe(searchResponse => {
      this.searchResult = searchResponse.items;
    });
  }

  followUser(user) {
    this.githubService.followUser(user.login).subscribe(followResponse => {
      this.followingUsers.push(user.login);
    });
    this.followUserEmitter.emit(user);
  }

  unfollow(user) {
    const index = this.followingUsers.indexOf(user);
    this.followingUsers.splice(index, 1);
  }
}
