// @flow
import reducer from './images.reducer';
import * as actions from './images.actions';
import * as actionTypes from './images.actionTypes';
import ImageFactory from '../../factories/ImageFactory';

describe('images reducer', () => {
  const expectedInitialState = [];

  it('should return the initial state on unrelated action', () => {
    expect(reducer(undefined, { type: 'SOME_ACTION' })).toEqual(expectedInitialState);
  });

  describe('handling RECEIVE_IMAGES action', () => {
    it('should add the images', () => {
      const images = [ImageFactory.createDummyImage()];

      const action: actions.ReceiveImagesAction = {
        type: actionTypes.RECEIVE_IMAGES,
        images,
      };

      expect(reducer([], action)).toEqual(images);
    });

    it('should replace existing images with the same id', () => {
      const existingImage = ImageFactory.createDummyImage();
      const images = [
        { ...existingImage, color: 'green' },
        ImageFactory.createDummyImage(),
      ];

      const action: actions.ReceiveImagesAction = {
        type: actionTypes.RECEIVE_IMAGES,
        images,
      };

      expect(reducer([existingImage], action)).toEqual(images);
    });
  });
});
