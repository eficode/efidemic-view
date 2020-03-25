const infection = require('./infection/infection.service.js');
const symptom = require('./symptom/symptom.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(infection);
  app.configure(symptom);
};
