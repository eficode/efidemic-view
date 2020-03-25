// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
const { Symptom } = require('./symptom.model');

class infection extends Model {

  static get tableName() {
    return 'infections';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['postal_code'],

      properties: {
        postal_code: { type: 'string' },
        confirmed: {
          type: 'boolean',
          default: false
        },
        has_symptoms: {
          type: 'boolean',
          default: false
        },
      }
    };
  }

  static get relationMappings() {
    return {
      symptoms: {
        relation: Model.HasManyRelation,
        modelClass: Symptom,
        join: {
          from: 'infections.id',
          to: 'symptoms.infectionId'
        }
      }
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
  const db = app.get('knex');

  db.schema.hasTable('infections').then(exists => {
    if (!exists) {
      db.schema.createTable('infections', table => {
        table.increments('id');
        table.string('postal_code');
        table.boolean('confirmed');
        table.boolean('has_symptoms');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created infections table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating infections table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating infections table', e)); // eslint-disable-line no-console

  return infection;
};
