// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class symptom extends Model {

  static get tableName() {
    return 'symptoms';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        name: { type: 'string' }
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

  db.schema.hasTable('symptoms').then(exists => {
    if (!exists) {
      db.schema.createTable('symptoms', table => {
        table.increments('id');
        table.string('name');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created symptoms table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating symptoms table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating symptoms table', e)); // eslint-disable-line no-console

  return symptom;
};
