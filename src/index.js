import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';

import App from 'containers/App';
import CacheBuster from 'containers/CacheBuster';
import LanguageProvider, { translationMessages } from 'containers/LanguageProvider';
import * as serviceWorker from './serviceWorker';

import configureStore from './configureStore';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <CacheBuster>
    <Provider store={store}>
      <LanguageProvider messages={translationMessages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>
  </CacheBuster>,
  MOUNT_NODE,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
