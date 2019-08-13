// @flow
import _ from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Gallery from './Gallery';
import ImageFactory from '../../../factories/ImageFactory';
import GalleryItem from './GalleryItem';

const images = _.times(3, () => ImageFactory.createStaticDummyImage())
  .map(image => ({
    ...image,
    delete: () => Promise.resolve(),
  }));

describe('<Gallery />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Gallery images={images} />);
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render the correct amount of items', () => {
    const items = wrapper.find(GalleryItem);
    expect(items).toHaveLength(3);
  });
});
