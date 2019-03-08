// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import Tag from '../utility/Tag';
import TagSuggestions from './form/TagSuggestions';
import MobileTaggingInput from './MobileTaggingInput';
import type { TaggableImage } from '../images/ImageEdit';
import './MobileTagging.scss';

type Props = {
  image: TaggableImage,
  onSubmit: () => {},
};

function MobileTagging(props: Props) {
  const { image } = props;

  return (
    <div className="MobileTagging">
      <header>
        <div className="MobileTagging__suggestions-container">
          <h3 className="MobileTagging__suggestions__title">
            Suggestions
            <span className="MobileTagging__suggestions__tip">
              press to apply
            </span>
          </h3>
          <div className="MobileTagging__suggestions">
            <TagSuggestions
              tags={image.userTags}
              onSuggestionClick={image.addTag}
            />
          </div>
        </div>
        <Link to="back" className="MobileTagging__cancel">
          <IoIosClose />
          <span>Cancel</span>
        </Link>
      </header>
      <div className="MobileTagging__image-container">
        <img
          src={image.url}
          alt={image.userTags.join(' ')}
          className="MobileTagging__image"
        />
        <div className="MobileTagging__tags">
          {image.userTags.map(tag => (
            <Tag
              key={tag}
              caption={tag}
              removable
              onRemove={image.removeTag}
            />
          ))}
        </div>
        <MobileTaggingInput
          onTagSubmit={image.addTag}
          onSave={props.onSubmit}
          isSaveDisabled={image.userTags.length === 0}
        />
      </div>
    </div>
  );
}

export default MobileTagging;
