import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import reducer from './reducer';
import messages from './messages.json';

import Pages from './pages/containers/Page';

// import store from './store';

addLocaleData([...en, ...es]);

const locale = navigator.languages.indexOf('es') >= 0 ? 'es' : 'en';

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
    ),
  ),
  preloadedState,
);

render(
  <Provider store={store}>
    <IntlProvider locale={locale} messages={messages[locale]}>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById('render-target'),
);
