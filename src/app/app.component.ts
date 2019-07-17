import { Component } from '@angular/core';
import {GithubService} from './shared/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: any;

  constructor(private githubService: GithubService) {
    // this.githubService.getInitial().subscribe(response => {
    //   console.log(response);
    // });

    this.githubService.getUser().subscribe(userResponse => {
      this.user = userResponse;
    });

    // this.githubService.getRepositories().subscribe(repositoriesResponse => {
    //   console.log(repositoriesResponse);
    // });

    // this.githubService.createRepository().subscribe(creationResponse => {
    //   console.log(creationResponse);
    // });
  }
}
