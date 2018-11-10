// @flow
import faker from 'faker';
import type { Tag } from '../models/Tag';
import ColorFactory from './ColorFactory';

class TagFactory {
  static createTag(caption: string): Tag {
    return {
      caption,
      color: ColorFactory.getRandomColor(),
    };
  }

  static createDummyTag(): Tag {
    return {
      caption: faker.lorem.word(),
      color: ColorFactory.getRandomColor(),
    };
  }
}

export default TagFactory;
