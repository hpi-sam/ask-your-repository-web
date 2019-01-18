// @flow
/* eslint-disable no-bitwise */
import type { Tag } from '../models/Tag';

const colors = [
  'red',
  'blue',
  'darkgreen',
  'orange',
  'purple',
];

class ColorFactory {
  static fromTag = (tag: Tag): string => {
    let hash = 0;
    let i = 0;
    let char;

    for (; i < tag.length; i += 1) {
      char = tag.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }

    return colors[Math.abs(hash) % colors.length];
  };
}

export default ColorFactory;
