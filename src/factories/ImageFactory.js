// @flow
import _ from 'lodash';
import faker from 'faker';
import type { Image } from '../models/Image';

class ImageFactory {
  static createDummyImage(tagAmount: number = 3): Image {
    const userTags = _.times(tagAmount, () => faker.lorem.slug());
    const labelTags = _.times(tagAmount, () => faker.lorem.slug());
    const textTags = _.times(tagAmount, () => faker.lorem.slug());
    const tags = [...userTags, ...labelTags, ...textTags];

    return {
      id: faker.random.uuid(),
      url: faker.image.dataUri(),
      userTags,
      labelTags,
      textTags,
      tags,
      score: faker.random.number({ min: 1, max: 10 }) / 10,
    };
  }

  static createStaticDummyImage(): Image {
    return {
      id: '599f681f-cc56-4ef4-b871-4bf6329341f3',
      score: 1,
      url: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%20%20%3Ctext%20x%3D%220%22%20y%3D%2220%22%20font-size%3D%2220%22%20text-anchor%3D%22start%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%20%3C%2Fsvg%3E',
      userTags: ['nemo-dolorum-iusto'],
      labelTags: ['aut-quia-atque'],
      textTags: ['et-velit-dolorem'],
      tags: ['nemo-dolorum-iusto', 'aut-quia-atque', 'et-velit-dolorem'],
    };
  }
}

export default ImageFactory;
