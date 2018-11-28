// @flow
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Root from './Root';

describe('<Root />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Root />);
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
