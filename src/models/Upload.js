// @flow
import type { TaggableImage } from '../hooks/useTaggableImage';

export type Upload = {
  id: string,
  file: File,
  status: 'ongoing' | 'succeeded' | 'failed',
  image: ?TaggableImage,
  retry: () => void,
}
