// @flow
import _ from 'lodash';
import faker from 'faker';
import TagFactory from './TagFactory';
import type { Image } from '../models/Image';

class ImageFactory {
  static createDummyImage(tagAmount: number = 3): Image {
    return {
      id: faker.random.number(),
      src: faker.image.dataUri(),
      tags: _.times(tagAmount, () => TagFactory.createDummyTag()),
    };
  }
}

export default ImageFactory;
