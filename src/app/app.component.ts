import {Component, OnInit} from '@angular/core';
import {GithubService} from './shared/github.service';
import {TranslateService} from '@ngx-translate/core';

declare const require;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  user: any;

  constructor(private githubService: GithubService, public translateService: TranslateService) {

    this.githubService.getUser().subscribe(userResponse => {
      this.user = userResponse;
    });
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('es');
    this.translateService.use('es');

    // With this we load the default language in the main bundle (cache busting)
    this.translateService.setTranslation('es', require('../assets/i18n/es.json'));
  }
}
