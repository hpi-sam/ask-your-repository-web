// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { ButtonLink } from '../utility/buttons';
import type { Image } from '../../models/Image';

type Props = {
  image: Image,
};

function RelatedImagesItem(props: Props) {
  const { image } = props;

  return (
    <ButtonLink to={`/images/${image.id}`} className="RelatedImages__item">
      <span className="RelatedImages__item__score">{image.score}</span>
      <img
        className="RelatedImages__item__image"
        alt={image.tags.join(' ')}
        src={image.url}
      />
      <div className="RelatedImages__item__overlay" />
    </ButtonLink>
  );
}

export default withRouter(RelatedImagesItem);
