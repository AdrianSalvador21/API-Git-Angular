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
  searchResult: any = [];
  @Output() followUserEmitter = new EventEmitter();

  constructor(public githubService: GithubService) {
  }

  ngOnInit() {
  }

  search(inputSearch) {
    console.log(this.followingUsers);
    this.searchResult = [];
    console.log(inputSearch);
    console.log(inputSearch.value);
    this.githubService.searchUser(inputSearch.value).subscribe(searchResponse => {
      console.log(searchResponse);
      this.searchResult = searchResponse.items;
    });
  }

  followUser(user) {
    this.githubService.followUser(user.login).subscribe(followResponse => {
      console.log(followResponse);
      this.followingUsers.push(user.login);
    });
    // emit
    this.followUserEmitter.emit(user);
  }
}
