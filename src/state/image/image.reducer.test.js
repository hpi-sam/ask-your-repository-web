// @flow
import reducer from './image.reducer';
import * as actions from './image.actions';
import * as actionTypes from './image.actionTypes';
import ImageFactory from '../../factories/ImageFactory';
import type { Image } from '../../models/Image';
import type { Tag } from '../../models/Tag';

describe('image reducer', () => {
  let image: Image = ImageFactory.createDummyImage(0);
  const expectedInitialState = null;

  it('should return the initial state on unrelated action', () => {
    expect(reducer(undefined, { type: 'SOME_ACTION' })).toEqual(expectedInitialState);
  });

  it('should handle SET_IMAGE', () => {
    const action: actions.SetImageAction = {
      type: actionTypes.SET_IMAGE,
      image,
    };

    expect(reducer(undefined, action)).toEqual(image);
  });

  it('should handle ADD_TAG', () => {
    const tag: Tag = 'Example';

    const action: actions.AddTagAction = {
      type: actionTypes.ADD_TAG,
      tag,
    };

    expect(reducer(image, action)).toEqual({
      ...image,
      tags: [...image.tags, tag],
    });

    expect(reducer(undefined, action)).toEqual(expectedInitialState);
  });

  it('should handle REMOVE_LAST_TAG', () => {
    image = ImageFactory.createDummyImage(3);

    const action: actions.RemoveLastTagAction = {
      type: actionTypes.REMOVE_LAST_TAG,
    };

    expect(reducer(image, action)).toEqual({
      ...image,
      tags: [image.tags[0], image.tags[1]],
    });
    expect(reducer(undefined, action)).toEqual(expectedInitialState);
  });
});
