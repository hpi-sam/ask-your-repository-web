// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import ImageFactory from '../../../factories/ImageFactory';
import TaggingImagePreview from './TaggingImagePreview';

jest.mock('../../../config/api', () => ({
  post: jest.fn(() => Promise.resolve()),
}));

describe('<TaggingImagePreview />', () => {
  const image = ImageFactory.createDummyImage();

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TaggingImagePreview image={image} />);
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render an <img /> tag with the correct image src', () => {
    const img = wrapper.find('img');
    expect(img.prop('src')).toEqual(image.url);
  });
});
