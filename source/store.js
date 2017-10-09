import { createStore } from 'redux';

import reducer from './reducer';

const store = createStore(reducer);

/* store.subscribe(() => {
  const state = store.getState();
});

store.dispatch({
  type: 'SET_POST',
  payload: {

  }
}) */

export default store;
