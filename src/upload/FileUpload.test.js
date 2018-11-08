// @flow
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import FileUpload from './FileUpload';
import FileDropzone from './FileDropzone';
import api from '../config/api';

jest.mock('../config/api', () => ({
  post: jest.fn(() => Promise.resolve()),
}));

describe('<FileUpload />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<FileUpload />);
  });

  afterEach(() => {
    api.post.mockClear();
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders an FileDropzone component', () => {
    expect(wrapper.find(FileDropzone)).toBeTruthy();
  });

  describe('an image has been dropped', () => {
    const imageBlob = new Blob([], { type: 'image/jpeg' });

    beforeEach(async () => {
      await wrapper.instance().handleImageDrop([imageBlob]);
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

    describe('upload succeeded', () => {
      it('should display a success message', () => {
        expect(wrapper.text()).toEqual(expect.stringContaining('success'));
      });
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

  it('do nothing if image drop is called without any files', () => {
    wrapper.instance().handleImageDrop(null);
    expect(api.post).not.toHaveBeenCalled();
  });
});
