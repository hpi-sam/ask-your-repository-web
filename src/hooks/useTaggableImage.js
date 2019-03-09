// @flow
import type { Image } from '../models/Image';
import useImage from './useImage';
import type { Tag } from '../models/Tag';

export type TaggableImage = Image & {
  addTag: (tag: Tag) => void,
  removeTag: (tag: Tag) => void,
};

function useTaggableImage(imageId: string): ?TaggableImage {
  const { image, setImage } = useImage(imageId);

  function addTag(tag: Tag) {
    if (!image || image.userTags.includes(tag)) return;
    setImage({ ...image, userTags: [...image.userTags, tag] });
  }

  function removeTag(tag: Tag) {
    if (!image) return;
    setImage({
      ...image,
      userTags: image.userTags.filter(existingTag => existingTag !== tag),
    });
  }

  return image && { ...image, addTag, removeTag };
}

export default useTaggableImage;
