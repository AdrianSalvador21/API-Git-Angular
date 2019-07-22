import {Component, OnInit} from '@angular/core';
import {GithubService} from './shared/github.service';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import {AppState} from './app.reducer';

declare const require;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: any;
  language = '';

  constructor(private githubService: GithubService,
              private store: Store<AppState>,
              public translateService: TranslateService) {

    this.githubService.getUser().subscribe(userResponse => {
      this.user = userResponse;
    });

    this.store.select('language').subscribe(state => {
      console.log(state);
      this.language = state;
      this.translateService.use(this.language);
    });
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('es');
    this.translateService.use(this.language);

    // With this we load the default language in the main bundle (cache busting)
    this.translateService.setTranslation('es', require('../assets/i18n/es.json'));
  }
}
