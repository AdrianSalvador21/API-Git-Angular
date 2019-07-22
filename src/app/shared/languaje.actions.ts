import { Action } from '@ngrx/store';



export const SET_LANGUAGE = '[Language] Set Language';

export type validLanguages = 'es' | 'en';


export class SetLanguageAction implements Action {

  readonly type = SET_LANGUAGE;

  constructor( public language: validLanguages ) {}

}

export type actions = SetLanguageAction;
