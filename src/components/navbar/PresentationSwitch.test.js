// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import initialState from '../../state/initialState';
import PresentationSwitch from './PresentationSwitch';

const mockStore = configureStore();

describe('<PresentationSwitch />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow((
      <PresentationSwitch store={store} />
    )).dive();
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
