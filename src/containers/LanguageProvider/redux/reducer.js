/*
 *
 * LanguageProvider reducer
 *
 */
import produce from 'immer';

import { DEFAULT_LOCALE } from 'i18n';
import { CHANGE_LOCALE, LOCALE } from './constants';

export const initialState = {
  [LOCALE]: DEFAULT_LOCALE,
};

/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_LOCALE:
        draft[LOCALE] = action[LOCALE];
        break;
    }
  });

export default languageProviderReducer;
