import getConfig from '../../../core/configuration/configuration';

describe('Configuration Function', () => {
  beforeEach(() => {
    delete process.env.APP_PORT;
  });

  it('should return the default port if APP_PORT is not set', () => {
    const config = getConfig();
    expect(config.port).toBe(4001);
  });

  it('should return the port defined in APP_PORT as a number', () => {
    process.env.APP_PORT = '3000';
    const config = getConfig();
    expect(config.port).toBe(3000);
  });

  it('should return the default port if APP_PORT is set to an empty string', () => {
    process.env.APP_PORT = '';
    const config = getConfig();
    expect(config.port).toBe(4001);
  });
});
