// @flow
import React, { useState } from 'react';
import { useMedia } from 'react-use';
import { Redirect } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import ImageService from '../../services/ImageService';
import ActivityInidicator from '../utility/ActivityIndicator';
import MobileTagging from '../tagging/mobile/MobileTagging';
import SingleTagging from '../tagging/desktop/SingleTagging';
import useTaggableImage from '../tagging/useTaggableImage';
import { SaveButton, ButtonLink } from '../utility/buttons';
import Toolbar from '../utility/Toolbar';
import type { TaggableImage } from '../../models/Image';

type Props = {
  match: {
    params: { id: string },
  },
};

function ImageEdit(props: Props) {
  const isMobile = useMedia('(max-width: 600px)');
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

  if (isMobile) {
    return (
      <MobileTagging
        image={image}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div>
      <Toolbar>
        <ButtonLink to={`/images/${image.id}`}>
          <IoIosArrowRoundBack />
          <span>Back to image</span>
        </ButtonLink>
      </Toolbar>
      <SingleTagging image={image} />
      <SaveButton onClick={handleSubmit}>
        Save
      </SaveButton>
    </div>
  );
}

export default ImageEdit;
