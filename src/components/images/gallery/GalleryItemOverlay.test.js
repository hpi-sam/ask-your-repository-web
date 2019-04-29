// @flow
import React from 'react';
import { shallow } from 'enzyme';
import ImageFactory from '../../../factories/ImageFactory';
import Tag from '../../utility/Tag';
import GalleryItemOverlay from './GalleryItemOverlay';

const image = {
  ...ImageFactory.createStaticDummyImage(),
  delete: () => Promise.resolve(),
};

describe('<GalleryItem />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<GalleryItemOverlay
      image={image}
      maxTags={5}
    />);
  });

  it('should render the tags of the image', () => {
    image.userTags.forEach((tag, index) => {
      const tagComponent = wrapper.find(Tag).at(index);
      expect(tagComponent.props().caption).toEqual(tag);
    });
  });
});
