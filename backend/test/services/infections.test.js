const app = require('../../src/app');

describe('\'infections\' service', () => {
  it('registered the service', () => {
    const service = app.service('infections');
    expect(service).toBeTruthy();
  });
});
