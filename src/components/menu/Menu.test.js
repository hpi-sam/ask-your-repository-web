// @flow
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Menu from './Menu';

describe('<Menu />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Menu />).dive();
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
