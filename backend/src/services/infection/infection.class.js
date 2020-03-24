const { Service } = require('feathers-objection');

exports.Infection = class Infection extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
