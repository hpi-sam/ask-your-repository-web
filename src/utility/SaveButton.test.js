// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import SaveButton from './SaveButton';

describe('<SaveButton />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow((
      <SaveButton>
        Save
      </SaveButton>
    ));
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
