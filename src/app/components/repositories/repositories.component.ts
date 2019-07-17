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

  languages: any = [];
  selectedLanguages: any = [];

  constructor(public githubService: GithubService) {
    this.githubService.getRepositories().subscribe(repositoriesResponse => {
      this.repositories = repositoriesResponse;
      this.repositories.forEach(repository => {
        if (!this.languages.includes(repository.language) && !!repository.language) {
          this.languages.push(repository.language);
        }
      });
      this.repositoriesToShow = [...this.repositories];
      console.log(this.repositoriesToShow);
      console.log(this.languages);
    });
  }

  ngOnInit() {
  }

  change(event) {
    console.log(event);
  }

}
