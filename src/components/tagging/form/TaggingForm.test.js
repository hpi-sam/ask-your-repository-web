// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import ImageFactory from '../../../factories/ImageFactory';
import TaggingForm from './TaggingForm';

const image = ImageFactory.createStaticDummyImage();

describe('<TaggingForm />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TaggingForm image={image} />);
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
