// @flow
import type { Image } from './Image';

export type Upload = {
  id: string,
  file: File,
  status: 'ongoing' | 'succeeded' | 'failed',
  image: ?Image,
}
