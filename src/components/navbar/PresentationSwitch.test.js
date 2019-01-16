// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import initialState from '../../state/initialState';
import PresentationSwitch from './PresentationSwitch';

const mockStore = configureStore();

describe('<PresentationSwitch />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount((
      <Provider store={store}>
        <PresentationSwitch />
      </Provider>
    ));
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
