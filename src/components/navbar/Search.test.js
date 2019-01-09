// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import initialState from '../../state/initialState';
import Search from './Search';

const mockStore = configureStore();

describe('<Search />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount((
      <Provider store={store}>
        <Search />
      </Provider>
    ));
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
