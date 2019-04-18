// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import initialState from '../../state/initialState';
import UserFactory from '../../factories/UserFactory';
import NavBar from './NavBar';

const mockStore = configureStore();

const state = {
  ...initialState,
  user: UserFactory.createStaticAuthenticatedUser(),
};

describe('<NavBar />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(state);
    wrapper = mount((
      <Provider store={store}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </Provider>
    )).find('NavBar');
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
