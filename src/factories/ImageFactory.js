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
      score: faker.random.number({ min: 1, max: 10 }) / 10,
    };
  }

  static createStaticDummyImage(): Image {
    return {
      id: 3826,
      score: 1,
      url: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%20%20%3Ctext%20x%3D%220%22%20y%3D%2220%22%20font-size%3D%2220%22%20text-anchor%3D%22start%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%20%3C%2Fsvg%3E',
      tags: ['nemo-dolorum-iusto', 'aut-quia-atque', 'et-velit-dolorem'],
    };
  }
}

export default ImageFactory;
