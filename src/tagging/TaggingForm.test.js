// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import TaggingForm from './TaggingForm';
import api from '../config/api';
import ImageFactory from '../factories/ImageFactory';
import SaveButton from '../utility/SaveButton';
import type { AppState } from '../state/AppState';

const mockStore = configureStore();

jest.mock('../config/api', () => ({
  post: jest.fn(() => Promise.resolve()),
}));

describe('<TaggingForm />', () => {
  const image = ImageFactory.createDummyImage();
  const initialState: AppState = { image };

  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
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

    it('should send a POST request with tag captions to /images/:id/tags', () => {
      const captions = image.tags.map(tag => tag.caption);

      expect(api.post).toHaveBeenCalledWith(
        `/images/${image.id}/tags`,
        { tags: captions },
      );
    });
  });
});
