// @flow
import _ from 'lodash';
import React from 'react';
import { mount } from 'enzyme';
import Gallery from './Gallery';
import ImageFactory from '../../factories/ImageFactory';

describe('<Gallery />', () => {
  const tagAmount = 6;
  const images = _.times(2, () => ImageFactory.createDummyImage(tagAmount));
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Gallery images={images} />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should only render the first 5 tags', () => {
    const image = images[0];
    const text = wrapper.text();

    _.times(5, (i) => {
      expect(text).toEqual(expect.stringContaining(image.tags[i]));
    });

    expect(text).toEqual(expect.not.stringContaining(image.tags[5]));
  });
});
