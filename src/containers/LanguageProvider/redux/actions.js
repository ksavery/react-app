import { CHANGE_LOCALE, LOCALE } from './constants';

export function changeLocale(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    [LOCALE]: languageLocale,
  };
}
