import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { LOCALE } from './constants';

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = state => state.language || initialState;

/**
 * Select the language locale
 */
const makeSelectLocale = () => createSelector(selectLanguage, languageState => languageState[LOCALE]);

export { selectLanguage, makeSelectLocale };
