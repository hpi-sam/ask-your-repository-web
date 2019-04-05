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
    wrapper = shallow((
      <TaggingForm
        tags={image.userTags}
        addTag={() => {}}
        tagSelector="DummyTagSelector"
        isMultiTaggingEnabled={false}
      />
    ));
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
