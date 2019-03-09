// @flow
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ImageService from '../../services/ImageService';
import ActivityInidicator from '../utility/ActivityIndicator';
import MobileTagging from '../tagging/MobileTagging';
import useTaggableImage from '../../hooks/useTaggableImage';
import type { TaggableImage } from '../../hooks/useTaggableImage';

type Props = {
  match: {
    params: { id: string },
  },
};

function ImageEdit(props: Props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const image: ?TaggableImage = useTaggableImage(props.match.params.id);

  async function handleSubmit() {
    if (!image) return;

    const { id, userTags } = image;
    await ImageService.patch(id, { tags: userTags });
    setIsSubmitted(true);
  }

  if (!image) return <ActivityInidicator />;
  if (isSubmitted) return <Redirect to={`/images/${image.id}`} />;

  return (
    <MobileTagging
      image={image}
      onSubmit={handleSubmit}
    />
  );
}

export default ImageEdit;
