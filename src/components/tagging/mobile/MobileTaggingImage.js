// @flow
import React, { Fragment } from 'react';
import type { Node } from 'react';
import Swipe from 'react-easy-swipe';
import type { TaggableImage } from '../../../models/Image';
import SourceSetFactory from '../../../factories/SourceSetFactory';
import MobileTaggingInput from './MobileTaggingInput';
import type { Tag } from '../../../models/Tag';

type Props = {
  image: TaggableImage,
  renderTag: (tag: Tag) => Node,
  isSaveable: boolean,
  onSubmit: () => Promise<void>,
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
};

function MobileTaggingImage(props: Props) {
  const { image } = props;

  return (
    <Fragment>
      <Swipe
        onSwipeLeft={props.onSwipeLeft}
        onSwipeRight={props.onSwipeRight}
      >
        <img
          srcSet={SourceSetFactory.create(image.url, [320, 480])}
          src={image.url}
          alt={image.userTags.join(' ')}
          className="MobileTagging__image"
        />
        <div className="MobileTagging__tags">
          {image.userTags.map(props.renderTag)}
        </div>
      </Swipe>
      <MobileTaggingInput
        onTagSubmit={image.addTag}
        onSave={props.onSubmit}
        isSaveDisabled={!props.isSaveable}
      />
    </Fragment>
  );
}

MobileTaggingImage.defaultProps = {
  onSwipeLeft: () => {},
  onSwipeRight: () => {},
};

export default MobileTaggingImage;
