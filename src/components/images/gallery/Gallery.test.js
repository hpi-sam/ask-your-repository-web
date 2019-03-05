// @flow
import _ from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Gallery from './Gallery';
import ImageFactory from '../../../factories/ImageFactory';
import GalleryItem from './GalleryItem';
import ImageDecorator from './ImageDecorator';

const images = _.times(3, () => ImageFactory.createStaticDummyImage());

describe('<Gallery />', () => {
  let wrapper;

  beforeEach(() => {
    const decoratedImages = images.map(image => ImageDecorator.decorateImage(image));
    wrapper = shallow(<Gallery images={decoratedImages} />);
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render the correct amount of items', () => {
    const items = wrapper.find(GalleryItem);
    expect(items).toHaveLength(3);
  });
});
