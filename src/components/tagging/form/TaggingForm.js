// @flow
import React from 'react';
import type { Node } from 'react';
import TagSuggestions from './TagSuggestions';
import type { Tag } from '../../../models/Tag';
import './TaggingForm.scss';

type Props = {
  addTag: (tag: Tag) => void,
  isMultiTaggingEnabled: boolean,
  tagSelector: Node,
  tags: Array<Tag>,
};

function TaggingForm(props: Props) {
  const {
    tags,
    addTag,
    isMultiTaggingEnabled,
    tagSelector,
  } = props;

  return (
    <div className="TaggingForm">
      <div className="TaggingForm__title">
        Tag your image!
      </div>
      <div className="TaggingForm__info">
        Suggestions - Type number to add
      </div>
      <TagSuggestions
        tags={tags}
        onSuggestionClick={addTag}
      />
      <div className="TaggingForm__info">
        Type in a tag - Hit enter &#9166; - Repeat
      </div>
      {tagSelector}
      {isMultiTaggingEnabled && (
        <div className="TaggingForm__tip">
          <div className="TaggingForm__tip__title">
            Multi-Tagging
          </div>
          You can press a tag to apply the tag
          <br />
          to all your uploaded images at once.
          <br />
          Multi tags will be highlighted with an extra border.
        </div>
      )}
    </div>
  );
}

TaggingForm.defaultProps = {
  enableMultiTagging: false,
};

export default TaggingForm;
