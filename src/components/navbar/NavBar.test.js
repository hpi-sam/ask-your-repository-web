// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import initialState from '../../state/initialState';
import NavBar from './NavBar';

const mockStore = configureStore();

describe('<NavBar />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<NavBar store={store} />).dive();
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
