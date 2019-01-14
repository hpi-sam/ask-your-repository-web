// @flow
import { applyMiddleware } from 'redux';
import logger from 'redux-logger';
import configureStore from './configureStore';

jest.mock('redux');
jest.mock('redux-persist');

const history = {};

describe('configure redux store', () => {
  afterEach(() => {
    applyMiddleware.mockClear();
    delete process.env.NODE_ENV;
  });

  it('should include redux logger when environment is not production', () => {
    process.env.NODE_ENV = 'development';
    configureStore(history);

    const appliedMiddleware = applyMiddleware.mock.calls[0];
    expect(appliedMiddleware).toContain(logger);
  });

  it('should not include redux logger when environment is production', () => {
    process.env.NODE_ENV = 'production';
    configureStore(history);

    const appliedMiddleware = applyMiddleware.mock.calls[0];
    expect(appliedMiddleware).not.toContain(logger);
  });
});
