// @flow
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import initialState from '../state/initialState';
import App from './App';

const mockStore = configureMockStore();

describe('<App />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount((
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    )).find('App');
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
