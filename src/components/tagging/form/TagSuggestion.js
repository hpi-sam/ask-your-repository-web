// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import ColorFactory from '../../../factories/ColorFactory';
import type { Tag } from '../../../models/Tag';

type Props = {
  tag: Tag,
  onClick: (tag: Tag) => void,
  shortcut: string,
};

class TagSuggestion extends Component<Props> {
  handleClick = () => {
    const { onClick, tag } = this.props;
    onClick(tag);
  };

  render() {
    const { tag, shortcut } = this.props;
    const className = classNames('TagSuggestions__item', ColorFactory.fromTag(tag));

    return (
      <button
        onClick={this.handleClick}
        type="button"
        className={className}
      >
        <span className="TagSuggestions__item__shortcut">
          {shortcut}
        </span>
        <span className="TagSuggestions__item__text">
          {tag}
        </span>
      </button>
    );
  }
}

export default TagSuggestion;
