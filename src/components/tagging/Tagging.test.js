// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Tagging from './Tagging';
import TaggingForm from './form/TaggingForm';
import TaggingImagePreview from './TaggingImagePreview';
import ImageFactory from '../../factories/ImageFactory';

const image = ImageFactory.createStaticDummyImage();

describe('<Tagging />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow((
      <Tagging
        image={image}
        addTag={() => {}}
        isMultiTaggingEnabled={false}
        tagSelector="TagSelector"
      />
    ));
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders a TaggingForm component', () => {
    expect(wrapper.find(TaggingForm).exists()).toBeTruthy();
  });

  it('renders a TaggingImagePreview component', () => {
    expect(wrapper.find(TaggingImagePreview).exists()).toBeTruthy();
  });
});
