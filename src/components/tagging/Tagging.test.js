// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import createRouterContext from 'react-router-test-context';
import configureStore from 'redux-mock-store';
import Tagging from './Tagging';
import TaggingForm from './TaggingForm';
import TaggingImagePreview from './TaggingImagePreview';
import ImageFactory from '../../factories/ImageFactory';
import emptyState from '../../state/emptyState';

const mockStore = configureStore();
const initialState = { ...emptyState, image: ImageFactory.createStaticDummyImage() };

describe('<Tagging />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    const context = createRouterContext();
    wrapper = shallow(<Tagging store={store} />, { context }).dive();
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
