// @flow
import _ from 'lodash';
import React from 'react';
import { mount, shallow } from 'enzyme';
import Gallery from './Gallery';
import ImageFactory from '../../factories/ImageFactory';

describe('<Gallery />', () => {
  it('should only render the first 5 tags', () => {
    const images = _.times(2, () => ImageFactory.createDummyImage(6));
    const text = mount(<Gallery images={images} />).text();

    _.times(5, (i) => {
      expect(text).toEqual(expect.stringContaining(images[0].tags[i]));
    });

    expect(text).toEqual(expect.not.stringContaining(images[0].tags[5]));
  });

  it('should catch missing tags property', () => {
    const taglessImage: any = ImageFactory.createDummyImage(0);
    taglessImage.tags = null;
    const wrapper = shallow(<Gallery images={[taglessImage]} />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
