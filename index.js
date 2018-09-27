const modules = require('./src/modules');
const store = require('./src/store');

const redux = store.init();
modules.forEach(m => m.init({ redux }));
