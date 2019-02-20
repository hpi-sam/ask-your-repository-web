// @flow
import React from 'react';
import { shallow } from 'enzyme';
import ImageFactory from '../../factories/ImageFactory';
import Tag from '../utility/Tag';
import GalleryItem from './GalleryItem';

const image = ImageFactory.createStaticDummyImage();

describe('<GalleryItem />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<GalleryItem image={image} />);
  });

  it('should render an img with the correct src', () => {
    const img = wrapper.find('img');
    expect(img.props().src).toEqual(image.url);
  });

  it('should render the tags of the image', () => {
    image.tags.forEach((tag, index) => {
      const tagComponent = wrapper.find(Tag).at(index);
      expect(tagComponent.props().caption).toEqual(tag);
    });
  });
});
