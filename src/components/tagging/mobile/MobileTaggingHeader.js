// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import TagSuggestions from '../shared/TagSuggestions';
import type { TaggableImage } from '../../../models/Image';

type Props = {
  image: ?TaggableImage,
};

function MobileTaggingHeader(props: Props) {
  const { image } = props;

  return (
    <header>
      <div className="MobileTagging__suggestions-container">
        <h3 className="MobileTagging__suggestions__title">
          Suggestions
          <span className="MobileTagging__suggestions__tip">
            press to apply
          </span>
        </h3>
        <div className="MobileTagging__suggestions">
          {image && (
            <TagSuggestions
              tags={image.userTags}
              onSuggestionClick={image.addTag}
            />
          )}
        </div>
      </div>
      <Link to="back" className="MobileTagging__cancel">
        <IoIosClose />
        <span>Cancel</span>
      </Link>
    </header>
  );
}

export default MobileTaggingHeader;
