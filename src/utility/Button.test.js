// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Button from './Button';

describe('<Button />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow((
      <Button>
        Submit
      </Button>
    ));
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
