// @flow
import { applyMiddleware } from 'redux';
import logger from 'redux-logger';
import socketioMiddleware from '../middleware/socketioMiddleware';
import configureStore from './configureStore';

jest.mock('redux');
jest.mock('redux-persist');
jest.mock('../middleware/socketioMiddleware');

describe('configure redux store', () => {
  afterEach(() => {
    applyMiddleware.mockClear();
    delete process.env.NODE_ENV;
  });

  it('should include redux logger when environment is not production', () => {
    process.env.NODE_ENV = 'development';
    configureStore();

    const appliedMiddleware = applyMiddleware.mock.calls[0];
    expect(appliedMiddleware).toContain(logger);
  });

  it('should not include redux logger when environment is production', () => {
    process.env.NODE_ENV = 'production';
    configureStore();

    const appliedMiddleware = applyMiddleware.mock.calls[0];
    expect(appliedMiddleware).not.toContain(logger);
  });

  it('should include socketio middleware when socketio_url is defined', () => {
    jest.resetAllMocks();

    configureStore(history);

    expect(socketioMiddleware).toHaveBeenCalled();
  });
});
