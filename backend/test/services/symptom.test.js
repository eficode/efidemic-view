const app = require('../../src/app');

describe('\'symptom\' service', () => {
  it('registered the service', () => {
    const service = app.service('symptoms');
    expect(service).toBeTruthy();
  });
});
