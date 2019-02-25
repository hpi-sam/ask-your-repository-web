// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import LoginForm from './LoginForm';
import UserService from '../../services/UserService';
// import UserFactory from '../../factories/UserFactory';
import initialState from '../../state/initialState';

const mockStore = configureMockStore();

jest.mock('../../services/UserService');

describe('<LoginForm />', () => {
  let wrapper;
  let store;

  beforeAll(() => {
    UserService.logout.mockImplementation(() => Promise.resolve());
  });

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount((
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>
    )).find('LoginForm');
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
