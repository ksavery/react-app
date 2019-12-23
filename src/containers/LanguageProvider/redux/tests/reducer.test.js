import languageProviderReducer from '../reducer';
import { CHANGE_LOCALE, LOCALE } from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('languageProviderReducer', () => {
  it('returns the initial state', () => {
    expect(languageProviderReducer(undefined, {})).toEqual({
      [LOCALE]: 'en',
    });
  });

  it('changes the locale', () => {
    expect(
      languageProviderReducer(undefined, {
        type: CHANGE_LOCALE,
        [LOCALE]: 'de',
      }),
    ).toEqual({
      [LOCALE]: 'de',
    });
  });
});
