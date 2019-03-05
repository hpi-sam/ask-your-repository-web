// @flow
import React from 'react';
import { shallow } from 'enzyme';
import ImageFactory from '../../../factories/ImageFactory';
import GalleryItem from './GalleryItem';
import ImageDecorator from './ImageDecorator';


const image = ImageFactory.createStaticDummyImage();

describe('<GalleryItem />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<GalleryItem image={ImageDecorator.decorateImage(image)} />);
  });

  it('should render an img with the correct src', () => {
    const img = wrapper.find('img');
    expect(img.props().src).toEqual(image.url);
  });
});
