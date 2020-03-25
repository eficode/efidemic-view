const { Service } = require('feathers-objection');

exports.Symptom = class Symptom extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
