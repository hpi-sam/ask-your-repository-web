// @flow
import React from 'react';
import faker from 'faker';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import FileUpload from './FileUpload';
import FileDropzone from './FileDropzone';
import api from '../../config/api';
import emptyState from '../../state/emptyState';

const mockStore = configureStore();

jest.mock('../../config/api', () => {
  const responseData = { id: 1 };

  return {
    post: jest.fn(() => Promise.resolve({ data: responseData })),
  };
});

describe('<FileUpload />', () => {
  let wrapper;
  let wrapperInstance;
  let store;

  beforeEach(() => {
    store = mockStore(emptyState);
    wrapper = mount((
      <Provider store={store}>
        <FileUpload />
      </Provider>
    ));
    wrapperInstance = wrapper.find('FileUpload').instance();
  });

  afterEach(() => {
    api.post.mockClear();
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders an FileDropzone component', () => {
    expect(wrapper.find(FileDropzone).exists()).toBeTruthy();
  });

  describe('an image has been dropped', () => {
    const imageBlob = new Blob([], { type: 'image/jpeg' });

    beforeEach(async () => {
      await wrapperInstance.handleImageDrop([imageBlob]);
    });

    it('should send a POST request to the server', () => {
      expect(api.post).toHaveBeenCalled();
    });

    it('should set the correct Content-Type for the request', () => {
      const { headers } = api.post.mock.calls[0][2];
      expect(headers['Content-Type']).toEqual('multipart/form-data');
    });

    it('should send the dropped file as form-data', async () => {
      const formData = api.post.mock.calls[0][1];
      const sentFile = formData.get('image');

      let sentFileData: string;
      let imageBlobData: string;

      function asyncFileReader(file: Blob, onLoad: (string) => void) {
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
        asyncFileReader(imageBlob, (result) => { imageBlobData = result; }),
      ]);

      expect(sentFileData).toEqual(imageBlobData);
    });

    describe('upload failed because of network error', () => {
      beforeAll(() => {
        api.post.mockImplementation(() => Promise.reject(Response.error()));
      });

      it('should display a network error message', () => {
        expect(wrapper.text()).toEqual(expect.stringContaining('unavailable'));
      });
    });

    describe('upload failed because of server error', () => {
      const errorMessage = 'Dummy Error';
      const errorResponse = { message: errorMessage };

      beforeAll(() => {
        api.post.mockImplementation(() => Promise.reject({ response: errorResponse }));
      });

      it('should display the error message', () => {
        expect(wrapper.text()).toEqual(expect.stringContaining(errorMessage));
      });
    });
  });

  it('should not dispatch any action when imageId is not set', () => {
    wrapperInstance.setImageState(faker.image.dataUri());
    expect(store.getActions()).toHaveLength(0);
  });

  it('do nothing if image drop is called without any files', () => {
    wrapperInstance.handleImageDrop(null);
    expect(api.post).not.toHaveBeenCalled();
  });
});