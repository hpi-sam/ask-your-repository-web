import io from 'socket.io-client';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import socketioMiddleware from './socketioMiddleware';
import mockIO, { serverSocket } from '../mocks/socketioMock';
import { SET_ACTIVE_TEAM } from '../state/active_team/activeTeam.actionTypes';

jest.mock('socket.io-client', () => jest.fn(() => mockIO()));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

describe('socketio middleware', () => {
  beforeEach(() => {
    process.env.REACT_APP_API_URL = 'http://localhost:5000';
  });

  afterEach(() => {
    delete process.env.REACT_APP_API_URL;
  });

  describe('setup middleware', () => {
    beforeEach(() => {
      store = mockStore({
        presentationMode: {
          isActive: true,
        },
      });
      socketioMiddleware()(store);
    });

    it('calls socketio.io with process.env.REACT_APP_API_URL', () => {
      expect(io).toBeCalledWith(process.env.REACT_APP_API_URL);
    });

    it('registers START_PRESENTATION', () => {
      expect(mockIO().on).toBeCalledWith('START_PRESENTATION', expect.any(Function));
    });

    it('calls the registered function for START_PRESENTATION ', () => {
      serverSocket.emit('START_PRESENTATION', [{
        id: 'image_id', url: 'test_url', tags: 'test', score: 1.0,
      }]);
      expect();
    });
  });

  describe('emit actions', () => {
    describe('SET_ACTIVE_TEAM', () => {
      beforeEach(() => {
        store = mockStore({
          activeTeam: {
            id: 'test_id',
            name: 'team_name',
          },
        });
        const action = {
          type: SET_ACTIVE_TEAM,
          team: {
            id: 'new_test_id',
            name: 'new_test_team',
          },
        };
        socketioMiddleware()(store)(() => {})(action);
      });

      afterEach(() => {
        Object.values(mockIO()).forEach((mock) => {
          mock.mockReset();
        });
      });

      it('EXIT_TEAM_SPACE', () => {
        expect(mockIO().emit.mock.calls[0]).toEqual(['EXIT_TEAM_SPACE', { team_id: 'test_id' }]);
      });

      it('ENTER_TEAM_SPACE', () => {
        expect(mockIO().emit.mock.calls[1]).toEqual(['ENTER_TEAM_SPACE', { team_id: 'new_test_id' }]);
      });
    });
  });
});
