import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GithubService} from '../../shared/github.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {
  @ViewChild('childModal') public childModal: ElementRef;
  creatingRepository = false;
  selectedPage = 1;
  error = false;
  repositories: any;
  repositoriesToShow: any;
  languages: any = [];
  selectedLanguages: any = [];
  filterForm = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    private: [false]
  });

  constructor(public githubService: GithubService, public fb: FormBuilder) {
    this.getRepositoriesData(this.selectedPage);
  }

  ngOnInit() {
  }

  getRepositoriesData(page) {
    this.repositoriesToShow = [];
    this.repositories = [];
    this.githubService.getRepositories(page).subscribe(repositoriesResponse => {
      this.repositories = repositoriesResponse;
      this.repositories.forEach(repository => {
        if (!this.languages.includes(repository.language) && !!repository.language) {
          this.languages.push(repository.language);
        }
      });
      this.repositoriesToShow = [...this.repositories];
      this.changePrivate();
    });
  }

  changeLanguage() {
    this.selectedLanguages = [];
    const checks = document.getElementsByClassName('languages');
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
      if (this.repositoriesToShow.length !== 0) {
        this.filterData();
      }
    } else if (this.repositoriesToShow.length !== 0) {
      this.repositoriesToShow = [...this.repositories];
    }
  }

  changePrivate() {
    const selectedFilter = [];
    const checks = document.getElementsByClassName('private');
    let uncheckedElements = 0;
    // @ts-ignore
    for (const item of checks) {
      if (!item.checked) {
        uncheckedElements += 1;
      } else if (!selectedFilter.includes(item.id)) {
        selectedFilter.push(item.id);
      }
    }
    if (selectedFilter.length === 0 || selectedFilter.length === 2) {
      this.repositoriesToShow = [...this.repositories];
      this.changeLanguage();
    } else {
      this.repositoriesToShow = selectedFilter[0] === 'public' ? this.repositories.filter((repo) => {
        return repo.private === false;
      }) : this.repositories.filter((repo) => {
        return repo.private === true;
      });
    }
  }

  filterData() {
    this.repositoriesToShow = this.repositories.filter((repo) => {
        return this.selectedLanguages.includes(repo.language);
      }
    );
  }

  createRepository() {
    this.error = false;
    this.creatingRepository = true;
    this.githubService.createRepository(this.filterForm.getRawValue()).subscribe(createResponse => {
      this.creatingRepository = false;
      const auxData = [...this.repositoriesToShow];
      auxData.push(createResponse);
      auxData.sort(this.compare);
      this.repositoriesToShow = [];
      this.repositoriesToShow = [...auxData];
      this.repositories.push(createResponse);
      this.repositories.sort(this.compare);
      this.filterForm.reset();
      this.childModal.nativeElement.click();
    }, createError => {
      console.dir(createError);
      this.creatingRepository = false;
      this.error = true;
    });
  }

  changePage(page) {
    this.selectedPage = page;
    this.getRepositoriesData(page);
  }

  compare = (a, b) => {
    if (a.name < b.name) { return -1; }
    return a.name > b.name ? 1 : 0;
  }
}
