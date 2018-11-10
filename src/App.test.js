// @flow
import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './App';
import Tagging from './tagging/Tagging';
import FileUpload from './upload/FileUpload';
import ImageFactory from './factories/ImageFactory';
import type { AppState } from './state/AppState';

const mockStore = configureStore();

describe('<App />', () => {
  let store;
  let wrapper;
  let state: AppState;

  beforeEach(() => {
    state = { image: null };
    store = mockStore(() => state);
    wrapper = shallow(<App store={store} />).dive();
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render a FileUpload component', () => {
    expect(wrapper.find(FileUpload).exists()).toBeTruthy();
  });

  describe('image state is set', () => {
    beforeEach(() => {
      state = { image: ImageFactory.createDummyImage() };
      wrapper = shallow(<App store={store} />).dive();
    });

    it('should not render a FileUpload component', () => {
      expect(wrapper.find(FileUpload).exists()).toBeFalsy();
    });

    it('should render a Tagging component', () => {
      expect(wrapper.find(Tagging).exists()).toBeTruthy();
    });
  });
});
