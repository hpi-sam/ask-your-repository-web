// @flow
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Root from './Root';

describe('<Root />', () => {
  let wrapper;

  beforeEach(() => {
    jest.resetModules();
    process.env.REACT_APP_API_URL = 'http://localhost:5000';
    wrapper = shallow(<Root />);
  });

  afterEach(() => {
    delete process.env.REACT_APP_API_URL;
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
