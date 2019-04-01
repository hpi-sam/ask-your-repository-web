// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import LoginForm from './LoginForm';
import initialState from '../../state/initialState';

const mockStore = configureMockStore();

jest.mock('../../services/AuthService', () => ({
  logout: jest.fn(() => Promise.resolve()),
}));


describe('<LoginForm />', () => {
  let wrapper;
  let store;
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID; // Necessary for snapshot testing
  beforeEach(() => {
    store = mockStore(initialState);
    delete process.env.REACT_APP_GOOGLE_CLIENT_ID; // Necessary for snapshot testing
    wrapper = mount((
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>
    )).find('LoginForm');
  });

  afterEach(() => {
    process.env.REACT_APP_GOOGLE_CLIENT_ID = clientId; // Necessary for snapshot testing
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
