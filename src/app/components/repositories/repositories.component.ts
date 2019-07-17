import { Component, OnInit } from '@angular/core';
import {GithubService} from '../../shared/github.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {
  repositories: any;
  repositoriesToShow: any;

  constructor(public githubService: GithubService) {
    this.githubService.getRepositories().subscribe(repositoriesResponse => {
      this.repositories = repositoriesResponse;
      this.repositoriesToShow = [...this.repositories];
      console.log(this.repositoriesToShow);
    });
  }

  ngOnInit() {
  }

  change(event) {
    console.log(event);
  }

}
