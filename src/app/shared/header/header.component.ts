import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {SetLanguageAction, validLanguages} from '../languaje.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() user: any;
  language: validLanguages = 'es';

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
  }

  changeLanguage() {
    this.language = this.language === 'es' ? 'en' : 'es';
    const accion = new SetLanguageAction( this.language );
    this.store.dispatch( accion );
  }

}
