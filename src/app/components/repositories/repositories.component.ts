import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GithubService} from '../../shared/github.service';
import {FormBuilder, Validators} from '@angular/forms';
import {error} from 'util';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {
  @ViewChild('childModal') public childModal: ElementRef;

  repositories: any;
  repositoriesToShow: any;
  languages: any = [];
  languagesToShow: any = [];
  selectedLanguages: any = [];

  filterForm = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    private: [false]
  });

  constructor(public githubService: GithubService, public fb: FormBuilder) {
    this.getRepositoriesData();
  }

  ngOnInit() {
  }

  getRepositoriesData() {
    this.repositoriesToShow = [];
    this.repositories = [];
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

  change() {
    this.selectedLanguages = [];
    const checks = document.getElementsByClassName('lenguages');
    let uncheckedElements = 0;
    // @ts-ignore
    for (const item of checks) {
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

  createRepository() {
    this.githubService.createRepository(this.filterForm.getRawValue()).subscribe(createResponse => {
      console.log(createResponse);
      this.getRepositoriesData();
      this.childModal.nativeElement.click();
    }, createError => {
      console.log(createError);
    });
  }
}
