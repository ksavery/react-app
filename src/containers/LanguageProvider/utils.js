/* eslint-disable global-require */
if (!Intl.PluralRules) {
  require('intl-pluralrules');
}

if (!Intl.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/en'); // Add locale data for en
}

const { DEFAULT_LOCALE } = require('i18n');
const enTranslationMessages = require('translations/en.json');

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages) : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE ? defaultFormattedMessages[key] : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
};

export { formatTranslationMessages, translationMessages };
