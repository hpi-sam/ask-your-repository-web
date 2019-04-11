// @flow
import React from 'react';
import { IoIosClose } from 'react-icons/io';
import TagSuggestions from '../shared/TagSuggestions';
import type { TaggableImage } from '../../../models/Image';

type Props = {
  image: ?TaggableImage,
  onDiscard: () => any,
};

function MobileTaggingHeader(props: Props) {
  const { image, onDiscard } = props;

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
      <button
        onClick={onDiscard}
        className="MobileTagging__cancel"
        type="button"
      >
        <IoIosClose />
        <span>Discard</span>
      </button>
    </header>
  );
}

export default MobileTaggingHeader;
