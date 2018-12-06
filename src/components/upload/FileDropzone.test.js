// @flow
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FileDropzone from './FileDropzone';

describe('<FileDropzone />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FileDropzone onDrop={() => {}} />);
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
