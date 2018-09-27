const configParser = require('temperature-config-parser');
const { all, select, takeLatest, throttle, fork } = require('redux-saga/effects');
const storage = require('../storage');
const api = require('../mqtt/api');
const { heatingControl, HEATING_ON, NO_ACTION } = require('../behaviour');
const { UPDATE_HEATING, sagas: heatingSagas } = require('./heating');
const { UPDATE_SENSORS, sagas: sensorSagas } = require('./sensors');

const selectors = {
  heating: state => state.thermos.heating.value,
  current: state => Object.values(state.thermos.sensors).map(s => s.temperature),
};

function* heatingControlSaga() {
  const heating = yield select(selectors.heating);
  const current = yield select(selectors.current);
  const { temperature } = configParser.getProgram(storage.schedule.getActive());
  const action = yield heatingControl(current, heating, temperature, storage.config.get());
  if (action !== NO_ACTION) api.setHeating(action === HEATING_ON);
}

function* publishStatusSaga() {
  const status = yield select(state => state);
  api.publishStatus(status);
}

const sagas = function* main() {
  yield all([
    takeLatest([UPDATE_HEATING, UPDATE_SENSORS], heatingControlSaga),
    throttle(10000, [UPDATE_HEATING, UPDATE_SENSORS], publishStatusSaga),
    fork(heatingSagas),
    fork(sensorSagas),
  ]);
};

module.exports = sagas;
