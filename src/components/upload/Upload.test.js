// @flow
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Upload from './Upload';
import FileDropzone from './FileDropzone';
import initialState from '../../state/initialState';
import TeamFactory from '../../factories/TeamFactory';
import ImageService from '../../services/ImageService';

const mockStore = configureStore();

jest.mock('../../services/ImageService', () => {
  const ImageFactory = require('../../factories/ImageFactory').default;
  const image = ImageFactory.createStaticDummyImage();

  return {
    create: jest.fn(() => Promise.resolve(image)),
  };
});

jest.mock('../../services/TagService', () => ({
  suggested: jest.fn(() => Promise.resolve([])),
}));

describe('<Upload />', () => {
  let wrapper;
  let wrapperInstance;
  let store;

  const state = { ...initialState, activeTeam: TeamFactory.createStaticDummyTeam() };

  beforeEach(() => {
    store = mockStore(state);
    wrapper = mount((
      <Provider store={store}>
        <Upload />
      </Provider>
    )).find('Upload');
    wrapperInstance = wrapper.instance();
  });

  afterEach(() => {
    ImageService.create.mockClear();
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders an FileDropzone component', () => {
    expect(wrapper.find(FileDropzone).exists()).toBeTruthy();
  });

  describe('an image has been dropped', () => {
    const imageFile = new File([], 'goat.jpg', { type: 'image/jpeg' });

    beforeEach(async () => {
      await wrapperInstance.handleFileDrop([imageFile]);
    });

    it('should call image create', () => {
      expect(ImageService.create).toHaveBeenCalled();
    });

    it('should send the dropped file as form-data', async () => {
      const formData = ImageService.create.mock.calls[0][0];
      const sentFile = formData.get('image');

      let sentFileData: string;
      let imageBlobData: string;

      function asyncFileReader(file: File, onLoad: (string) => void) {
        return new Promise((resolve) => {
          const fileReader = new FileReader();
          fileReader.onload = (e) => {
            onLoad(e.target.result);
            resolve();
          };
          fileReader.readAsDataURL(file);
        });
      }

      await Promise.all([
        asyncFileReader(sentFile, (result) => { sentFileData = result; }),
        asyncFileReader(imageFile, (result) => { imageBlobData = result; }),
      ]);

      expect(sentFileData).toEqual(imageBlobData);
    });

    describe('upload failed because of network error', () => {
      beforeAll(() => {
        ImageService.create.mockImplementation(() => Promise.reject(Response.error()));
      });

      it('should catch the error', () => {});
    });

    describe('upload failed because of server error', () => {
      const errorMessage = 'Dummy Error';
      const errorResponse = { message: errorMessage };

      beforeAll(() => {
        ImageService.create.mockImplementation(() => Promise.reject({ response: errorResponse }));
      });

      it('should catch the error', () => {});
    });
  });

  it('do nothing if image drop is called without any files', () => {
    wrapperInstance.handleFileDrop([]);
    expect(ImageService.create).not.toHaveBeenCalled();
  });
});
