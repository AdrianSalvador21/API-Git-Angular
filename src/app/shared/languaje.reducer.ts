
import * as fromLanguage from './languaje.actions';

const initialStatus: fromLanguage.validLanguages = 'es';

export function filtroReducer( state = initialStatus,
                               action: fromLanguage.actions ): fromLanguage.validLanguages {

  switch ( action.type ) {
    case fromLanguage.SET_LANGUAGE:
      return action.language;

    default:
      return state;
  }

}
