// Initializes the `symptom` service on path `/symptoms`
const { Symptom } = require('./symptom.class');
const createModel = require('../../models/symptom.model');
const hooks = require('./symptom.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/symptoms', new Symptom(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('symptoms');

  service.hooks(hooks);
};
