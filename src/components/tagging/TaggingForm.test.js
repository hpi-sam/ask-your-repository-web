// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import TaggingForm from './TaggingForm';
import api from '../../config/api';
import ImageFactory from '../../factories/ImageFactory';
import SaveButton from '../utility/SaveButton';
import initialState from '../../state/initialState';
import type { AppState } from '../../state/AppState';

const mockStore = configureStore();

jest.mock('../../config/api');

describe('<TaggingForm />', () => {
  const image = ImageFactory.createDummyImage();
  const state: AppState = { ...initialState, image };

  let store;
  let wrapper;

  beforeAll(() => {
    api.post.mockImplementation(() => Promise.resolve());
  });

  beforeEach(() => {
    store = mockStore(state);
    wrapper = shallow(<TaggingForm store={store} />).dive();
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('form is submitted', () => {
    beforeEach(() => {
      const saveButton = wrapper.find(SaveButton);
      saveButton.simulate('click');
    });

    it('should send a POST request with the tags to /images/:id/tags', () => {
      expect(api.post).toHaveBeenCalledWith(
        `/images/${image.id}/tags`,
        { tags: image.tags },
      );
    });
  });
});
