// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Tagging from './Tagging';
import TaggingForm from './TaggingForm';
import TaggingImagePreview from './TaggingImagePreview';
import emptyState from '../../state/emptyState';

const mockStore = configureStore();

describe('<Tagging />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(emptyState);
    wrapper = shallow(<Tagging store={store} />).dive();
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
