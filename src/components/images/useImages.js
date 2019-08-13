// @flow
import { useState, useEffect } from 'react';
import ImageService from '../../services/ImageService';
import type {
  Image as APIImage,
  DeletableImage,
} from '../../models/Image';
import type { Team } from '../../models/Team';

export const limit = 12;

function useImages(team: ?Team, search: string) {
  const [offset, setOffset] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isLoadingInitially, setIsLoadingInitially] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [images, setImages] = useState<APIImage[]>([]);

  function reset() {
    setImages([]);
    setIsLoadingInitially(true);
    setOffset(0);
    setHasMore(true);
  }

  function createDeleteHandler(image: APIImage) {
    return async () => {
      await ImageService.delete(image.id);
      setImages(imgs => imgs.filter(({ id }) => id !== image.id));
    };
  }

  async function fetchImages() {
    if (!hasMore || !team) return;

    const currentOffset = offset;
    setOffset(offset + limit);
    setIsLoadingMore(true);

    try {
      const params = {
        teamId: team.id,
        offset: currentOffset,
        limit,
        search,
      };

      const fetchedImages = await ImageService.list(params);

      if (fetchedImages.length === 0) {
        setHasMore(false);
      }

      setImages([...images, ...fetchedImages]);
    } catch (error) {
      // TODO: Handle error
    }

    setIsLoadingMore(false);
    setIsLoadingInitially(false);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    reset();
    fetchImages();
  }, [team, search]);

  return {
    images: images.map<DeletableImage>(image => ({
      ...image,
      delete: createDeleteHandler(image),
    })),
    isLoadingInitially,
    isLoadingMore,
    hasMore,
    loadMore: fetchImages,
  };
}

export default useImages;
