// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Tagging from './Tagging';
import TaggingForm from './TaggingForm';
import TaggingImagePreview from './TaggingImagePreview';
import ImageFactory from '../../factories/ImageFactory';
import emptyState from '../../state/emptyState';

const mockStore = configureStore();

describe('<Tagging />', () => {
  let wrapper;
  let store;
  let state = emptyState;

  beforeEach(() => {
    store = mockStore(() => state);
    wrapper = shallow(<Tagging store={store} />).dive();
  });

  describe('no image is set', () => {
    it('should render nothing', () => {
      expect(wrapper.html()).toEqual(null);
    });
  });

  describe('image is set', () => {
    beforeAll(() => {
      state = { ...emptyState, image: ImageFactory.createStaticDummyImage() };
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
});
