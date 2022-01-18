import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './ducks/store';
import I18n from "redux-i18n";
import { translations } from "./translations"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18n translations={translations} initialLang="en" fallbackLang="en">
        <App />
      </I18n>
    </Provider>
  </React.StrictMode >,
  document.getElementById('root')
);
