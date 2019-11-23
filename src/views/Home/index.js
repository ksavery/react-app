import React from 'react';
import { FormattedMessage } from 'react-intl';

import logo from './logo.svg';

import messages from './messages';
import './style/style.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          <FormattedMessage {...messages.LearnReact} />
        </a>
      </header>
    </div>
  );
}

export default App;
