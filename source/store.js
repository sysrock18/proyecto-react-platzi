import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducer';

// Esto es un middleware
const logger = store => next => (action) => {
  console.group('logger');
  console.debug('estado actual: ', store.getState());
  console.debug('accion', action);
  const result = next(action);
  console.debug('estado nuevo', store.getState());
  console.groupEnd();
  return result;
};

const store = createStore(
  reducer,
  applyMiddleware(
    createLogger,
    thunk,
  ),
);

/* store.subscribe(() => {
  const state = store.getState();
});

store.dispatch({
  type: 'SET_POST',
  payload: {

  }
}) */

export default store;
