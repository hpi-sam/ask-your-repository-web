// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import NavBar from './NavBar';

describe('<NavBar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavBar />);
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
