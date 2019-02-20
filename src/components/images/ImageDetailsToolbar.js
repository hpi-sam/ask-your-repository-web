// @flow
import React, { Fragment } from 'react';
import { IoIosArrowRoundBack, IoIosDocument } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import ButtonLink from '../utility/ButtonLink';
import Toolbar from '../utility/Toolbar';
import type { Image } from '../../models/Image';

type Props = {
  image: Image,
};

function ImageDetailsToolbar(props: Props) {
  const { image } = props;

  return (
    <Toolbar
      left={(
        <Fragment>
          <ButtonLink to="/images">
            <IoIosArrowRoundBack />
            <span>Back to gallery</span>
          </ButtonLink>
        </Fragment>
      )}
      right={(
        <Fragment>
          <a className="Button" href={image.url}>
            <IoIosDocument />
            <span>View file</span>
          </a>
          <ButtonLink to={`/images/${image.id}/edit`}>
            <MdEdit />
            <span>Edit</span>
          </ButtonLink>
        </Fragment>
      )}
    />
  );
}

export default ImageDetailsToolbar;
