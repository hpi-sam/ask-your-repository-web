// @flow
import type { TaggableImage } from './Image';

export type Upload = {
  id: string,
  file: File,
  status: 'ready' | 'ongoing' | 'succeeded' | 'failed',
  image: ?TaggableImage,
  retry: () => Promise<void> | void,
}
