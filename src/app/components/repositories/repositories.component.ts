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
  languagesToShow: any = [];
  selectedLanguages: any = [];

  constructor(public githubService: GithubService) {
    this.githubService.getRepositories().subscribe(repositoriesResponse => {
      this.repositories = repositoriesResponse;
      this.repositories.forEach(repository => {
        if (!this.languages.includes(repository.language) && !!repository.language) {
          this.languages.push(repository.language);
          this.languagesToShow = [...this.languages];
        }
      });
      this.repositoriesToShow = [...this.repositories];
      console.log(this.repositoriesToShow);
      console.log(this.languages);
    });
  }

  ngOnInit() {
  }

  change() {
    this.selectedLanguages = [];
    const checks = document.getElementsByClassName('lenguages');
    let uncheckedElements = 0;
    // @ts-ignore
    for (let item of checks) {
      if (!item.checked) {
        uncheckedElements += 1;
      } else if (!this.selectedLanguages.includes(item.id)) {
        this.selectedLanguages.push(item.id);
      }
    }

    if (this.selectedLanguages.length !== 0) {
      this.filterData();
    } else {
      this.repositoriesToShow = [...this.repositories];
    }

  }


  filterData() {
    this.repositoriesToShow = this.repositories.filter((repo) => {
        return this.selectedLanguages.includes(repo.language);
      }
    );
  }
}
