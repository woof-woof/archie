const { combineReducers } = require('redux');
const Immutable = require('seamless-immutable');
const heating = require('./heating');
const sensors = require('./sensors');
const sagas = require('./sagas');

const initialState = Immutable.from({
  heating: {},
  sensors: {},
});

const reducers = combineReducers({
  heating: heating.reducers,
  sensors: sensors.reducers,
});

const actions = {
  ...heating.actions,
  ...sensors.actions,
};

module.exports = {
  initialState,
  reducers,
  actions,
  sagas,
};
