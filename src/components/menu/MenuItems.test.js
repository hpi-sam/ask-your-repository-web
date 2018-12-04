// @flow
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MenuItems from './MenuItems';

describe('<MenuItems />', () => {
  let wrapper;

  beforeEach(() => {
    const close = jest.fn();
    wrapper = shallow(<MenuItems close={close} />);
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
