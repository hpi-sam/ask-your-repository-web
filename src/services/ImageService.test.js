// @flow
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import ImageService from './ImageService';
import * as actionTypes from '../state/images/images.actionTypes';
import * as actions from '../state/images/images.actions';
import api from '../config/api';
import emptyState from '../state/emptyState';

const mockStore = configureStore([thunk]);

jest.mock('../config/api');

describe('ImageService', () => {
  let store;

  beforeEach(() => {
    store = mockStore(emptyState);
  });

  describe('list', () => {
    const limit = 5;
    const offset = 0;

    describe('success response', () => {
      beforeAll(() => {
        api.get.mockImplementation(() => Promise.resolve({ data: { images: [] } }));
      });

      beforeEach(async () => {
        await store.dispatch(ImageService.list(offset, limit));
      });

      it('should send a GET request to /images', async () => {
        expect(api.get).toHaveBeenCalledWith(
          '/images',
          { params: { offset, limit } },
        );
      });

      it('should dispatch an RECEIVE_IMAGES action', async () => {
        const expectedAction: actions.ReceiveImagesAction = {
          images: [],
          type: actionTypes.RECEIVE_IMAGES,
        };

        expect(store.getActions()).toEqual(expect.arrayContaining([expectedAction]));
      });
    });

    describe('error response', () => {
      const errorMessage = 'Dummy Error';
      const errorResponse = { message: errorMessage };

      beforeAll(() => {
        api.get.mockImplementation(() => Promise.reject({ response: errorResponse }));
      });

      it('should return a rejecting promise', () => {
        try {
          store.dispatch(ImageService.list(offset, limit));
        } catch (response) {
          expect(response.message).toEqual(errorMessage);
        }
      });
    });
  });
});
