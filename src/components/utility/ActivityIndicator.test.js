// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import ActivityIndicator from './ActivityIndicator';

describe('<ActivityIndicator />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ActivityIndicator text="Loading" />);
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
