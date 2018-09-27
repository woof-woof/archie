const configParser = require('temperature-config-parser');
const storage = require('../storage');
const { getHistory } = require('../storage/history/repo');

module.exports = ({ redux: { state: getState } }) => ({
  // get schedules
  getSchedules: () => storage.schedule.getAll(),
  // set schedules
  setSchedules: (message) => {
    const schedules = JSON.parse(message);
    Object.entries(schedules).forEach(([id, schedule]) => storage.schedule.set(id, schedule));
    return storage.schedule.getAll();
  },
  // get status
  status: () => {
    const { thermos } = getState();
    return { ...thermos, program: configParser.getProgram(storage.schedule.getActive()) };
  },
  // get history
  history: ({ start, end, interval }) => getHistory(start, end, interval),
});
