// @flow
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MenuIcon from './MenuIcon';

describe('<MenuIcon />', () => {
  let wrapper;

  beforeEach(() => {
    const open = false;
    wrapper = shallow(<MenuIcon open={open} />);
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Props open is true', () => {
    beforeEach(() => {
      const open = true;
      wrapper = shallow(<MenuIcon open={open} />);
    });

    it('uses styleclass burger-menu open', () => {
      expect(wrapper.find('#burger_icon').hasClass('burger-menu open')).toEqual(true);
    });
  });

  describe('Props open is false', () => {
    beforeEach(() => {
      const open = false;
      wrapper = shallow(<MenuIcon open={open} />);
    });

    it('uses styleclass burger-menu', () => {
      expect(wrapper.find('#burger_icon').hasClass('burger-menu')).toEqual(true);
    });
  });
});
