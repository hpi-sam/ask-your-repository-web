// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import emptyState from '../../state/emptyState';
import Search from './Search';

const mockStore = configureStore();


describe('<Search />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(emptyState);
    wrapper = shallow(<Search store={store} />).dive();
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
