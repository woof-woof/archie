const { createStore, combineReducers, applyMiddleware, bindActionCreators } = require('redux');
const { all, fork } = require('redux-saga/effects');
const Immutable = require('seamless-immutable');
const { sagaMiddleware, logMiddleware } = require('./middleware');
const modules = require('../modules');

function init() {
  const state = {};
  const reducers = {};
  let actions = {};
  const sagas = [];

  modules.forEach(({ name, store }) => {
    state[name] = store.initialState;
    reducers[name] = store.reducers;
    actions = { ...store.actions, ...actions };
    sagas.push(fork(store.sagas));
  });

  // initialize state
  const initialState = Immutable.from(state);

  // initialize reducers
  const store = createStore(
    combineReducers(reducers),
    initialState,
    applyMiddleware(sagaMiddleware, logMiddleware),
  );

  const { dispatch } = store;
  actions = bindActionCreators(actions, dispatch);

  function* rootSaga() {
    yield all(sagas);
  }

  sagaMiddleware.run(rootSaga);

  return { store, actions, state: store.getState };
}

module.exports = { init };
