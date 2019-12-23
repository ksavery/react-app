import { changeLocale } from '../actions';

import { CHANGE_LOCALE, LOCALE } from '../constants';

describe('LanguageProvider actions', () => {
  describe('Change Local Action', () => {
    it('has a type of CHANGE_LOCALE', () => {
      const expected = {
        type: CHANGE_LOCALE,
        [LOCALE]: 'de',
      };
      expect(changeLocale('de')).toEqual(expected);
    });
  });
});
