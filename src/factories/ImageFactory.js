// @flow
import _ from 'lodash';
import faker from 'faker';
import type { Image } from '../models/Image';

class ImageFactory {
  static createDummyImage(tagAmount: number = 3): Image {
    return {
      id: faker.random.number(),
      url: faker.image.dataUri(),
      tags: _.times(tagAmount, () => faker.lorem.slug()),
    };
  }
}

export default ImageFactory;
