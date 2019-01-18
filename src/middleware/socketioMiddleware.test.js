import io from 'socket.io-client';
import configureStore from '../config/configureStore';
import socketioMiddleware from './socketioMiddleware';

const store = configureStore({});
let mockIo;

jest.mock('socket.io-client', () => mockIo);

let mockPromise;

jest.mock('./search.js', () => ({ search: jest.fn(() => mockPromise) }));

// const mockOn = jest.fn();
// const mockEmit = jest.fn();
/*
jest.mock('socket.io-client', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    lalala: jest.fn(),
    emit: jest.fn(),
  })),
  namedExport: jest.fn(),
}), { virtual: true });
*/
describe('socketio middleware', () => {
  beforeEach(() => {
  });

  it('calls socketio.io with process.env.REACT_APP_API_URL', () => {
    console.log('1. Test start');
    // const socket = io('random_url');
    // console.log(socket);
    socketioMiddleware(process.env.REACT_APP_API_URL)(store);
    console.log('1. Test finish');
    expect(io).toBeCalledWith(process.env.REACT_APP_API_URL);
  });

  it('registers START_PRESENTATION', () => {
    console.log('2. Test start');
    socketioMiddleware(process.env.REACT_APP_API_URL)(store);
    console.log('2. Test finish');
    expect(io().on).toBeCalledWith('START_PRESENTATION', expect.any(Function));
  });
});
