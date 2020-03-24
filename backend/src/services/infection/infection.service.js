// Initializes the `infection` service on path `/infections`
const { Infection } = require('./infection.class');
const createModel = require('../../models/infection.model');
const hooks = require('./infections.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/infections', new Infection(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('infections');

  service.hooks(hooks);
};
