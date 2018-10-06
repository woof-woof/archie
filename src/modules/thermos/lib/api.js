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
    const activeSchedule = storage.config.get('activeSchedule');
    const program = configParser.getProgram(storage.schedule.getActive());
    return {
      ...thermos,
      program: {
        target: program.temperature,
        mode: program.programName,
        program: activeSchedule,
      },
    };
  },
  // get history
  history: ({ start, end, interval }) => getHistory(start, end, interval),
});
