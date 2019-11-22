/*
 * LanguageProvider
 *
 * This component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { translationMessages } from './utils';
import { makeSelectLocale } from './redux/selectors';

export function LanguageProvider(props) {
  return (
    <IntlProvider locale={props.locale} key={props.locale} messages={props.messages[props.locale]}>
      {React.Children.only(props.children)}
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale,
}));

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider);
export { translationMessages };
