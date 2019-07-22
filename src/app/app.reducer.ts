import { ActionReducerMap } from '@ngrx/store';

import * as fromLanguage from './shared/languaje.reducer';

import * as fromLanguageActions from './shared/languaje.actions';

export interface AppState {
  language: fromLanguageActions.validLanguages;
}


export const appReducers: ActionReducerMap<AppState> = {
  language: fromLanguage.filtroReducer,
};
