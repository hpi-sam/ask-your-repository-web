// @flow
import React from 'react';
import classNames from 'classnames';
import ColorFactory from '../../../factories/ColorFactory';
import type { Tag } from '../../../models/Tag';

type Props = {
  tag: Tag,
  onClick: (tag: Tag) => void,
};

const TagSuggestion = ({ onClick, tag }: Props) => {
  const className = classNames(
    'TagSuggestions__item',
    ColorFactory.fromTag(tag),
  );

  return (
    <button
      onClick={() => onClick(tag)}
      type="button"
      className={className}
    >
      <span className="TagSuggestions__item__text">
        {tag}
      </span>
    </button>
  );
};

export default TagSuggestion;
