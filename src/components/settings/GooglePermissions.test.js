// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import GooglePermissions from './GooglePermissions';
import initialState from '../../state/initialState';
import UserFactory from '../../factories/UserFactory';
import UserService from '../../services/UserService';

const mockStore = configureStore([thunk]);

jest.mock('../../services/UserService');

jest.mock('../../config/createGoogleAuthInstance', () => (
  () => Promise.resolve({
    grantOfflineAccess: jest.fn(() => Promise.resolve({ code: 'auth_code' })),
  })
));

function createWrapper(localUser) {
  const state = { ...initialState };
  state.auth.user = localUser;
  const store = mockStore(state);
  const wrapper = mount((
    <Provider store={store}>
      <MemoryRouter>
        <GooglePermissions />
      </MemoryRouter>
    </Provider>
  )).find('GooglePermissions');
  return wrapper;
}

describe('<GooglePermissions />', () => {
  describe('when User is not connected', () => {
    let wrapper;
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    beforeEach(() => {
      const user = UserFactory.createStaticDummyUser();
      UserService.get.mockImplementation(jest.fn(() => (Promise.resolve(user))));
      delete process.env.REACT_APP_GOOGLE_CLIENT_ID; // Necessary for snapshot testing
      wrapper = createWrapper(user);
    });

    afterEach(() => {
      process.env.REACT_APP_GOOGLE_CLIENT_ID = clientId;
      UserService.get.mockClear();
    });

    it('renders correctly', () => {
      expect(toJson(wrapper))
        .toMatchSnapshot();
    });

    it('is returns false for isConnected', () => {
      expect(wrapper.instance().isConnected()).toEqual(false);
    });

    describe('handles google success', () => {
      let user;
      beforeEach(() => {
        user = UserFactory.createStaticDummyUser();
        user.google = {
          userId: 'test_user_id',
          hasOfflineAccess: false,
        };
        UserService.connectToGoogle.mockImplementation(user);
        const response = {
          getAuthResponse: jest.fn(() => ({ id_token: 'id_token' })),
        };
        wrapper.instance().handleConnectGoogleSuccess(response);
      });

      afterEach(() => {
        UserService.connectToGoogle.mockClear();
      });

      it('calls connectToGoogle', () => {
        expect(UserService.connectToGoogle).toBeCalledWith(user.id, 'id_token');
      });
    });

    it('handles google fail', () => {
      wrapper.instance().handleConnectGoogleFailure();
    });
  });

  describe('when User is connected', () => {
    let wrapper;

    beforeEach(() => {
      const user = UserFactory.createStaticDummyUser();
      user.google = {
        userId: 'test_user_id',
        hasOfflineAccess: false,
      };
      UserService.get.mockImplementation(jest.fn(() => (Promise.resolve(user))));
      wrapper = createWrapper(user);
    });

    afterEach(() => {
      UserService.get.mockClear();
    });

    it('is returns true for isConnected', () => {
      expect(wrapper.instance().isConnected()).toEqual(true);
    });

    it('is returns false for hasGoogleDriveAccess', () => {
      expect(wrapper.instance().hasGoogleDriveAccess()).toEqual(false);
    });

    describe('handles requestAdditionalPermissions', () => {
      let user;
      beforeEach(() => {
        user = UserFactory.createStaticDummyUser();
        user.google = {
          userId: 'test_user_id',
          hasOfflineAccess: true,
        };
        UserService.grantDriveAccess.mockImplementation(jest.fn(() => (Promise.resolve(user))));
        wrapper.instance().requestAdditionalPermissions();
      });

      afterEach(() => {
        UserService.grantDriveAccess.mockClear();
      });

      it('calls connectToGoogle', () => {
        expect(UserService.grantDriveAccess).toBeCalledWith(user.id, 'auth_code');
      });
    });

    it('handles additionalPermissionsError', () => {
      wrapper.instance().additionalPermissionsError();
    });
  });
});

describe('when User granted offline access', () => {
  let wrapper;

  beforeEach(() => {
    const user = UserFactory.createStaticDummyUser();
    user.google = {
      userId: 'test_user_id',
      hasOfflineAccess: true,
    };
    UserService.get.mockImplementation(jest.fn(() => (Promise.resolve(user))));
    wrapper = createWrapper(user);
  });

  afterEach(() => {
    UserService.get.mockClear();
  });

  it('is returns true for isConnected', () => {
    expect(wrapper.instance().isConnected()).toEqual(true);
  });

  it('is returns false for hasGoogleDriveAccess', () => {
    expect(wrapper.instance().hasGoogleDriveAccess()).toEqual(true);
  });

  describe('handles revokeAccess', () => {
    const user = UserFactory.createStaticDummyUser();

    beforeEach(() => {
      UserService.revokeDriveAccess.mockImplementation(jest.fn(() => (Promise.resolve())));
      wrapper.instance().revokeDriveAccess();
    });

    afterEach(() => {
      UserService.revokeDriveAccess.mockClear();
    });

    it('calls connectToGoogle', () => {
      expect(UserService.revokeDriveAccess).toBeCalledWith(user.id);
    });
  });
});
