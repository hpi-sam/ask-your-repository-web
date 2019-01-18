// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import ColorFactory from '../../factories/ColorFactory';
import type { Tag as TagType } from '../../models/Tag';
import './Tag.scss';

type Props = {
  caption: string,
  className?: string,
  isMultiTag?: boolean,
  clickable?: boolean,
  onClick: (tag: TagType) => void,
};

class Tag extends Component<Props> {
  static defaultProps = {
    className: '',
    isMultiTag: false,
    clickable: false,
    onClick: () => {},
  };

  handleClick = () => {
    const { caption, onClick } = this.props;
    onClick(caption);
  };

  render() {
    const {
      caption,
      className,
      isMultiTag,
      clickable,
      onClick,
      ...rest
    } = this.props;

    const styleClasses = classNames('Tag', ColorFactory.fromTag(caption), {
      'Tag--multi': isMultiTag,
      'Tag--clickable': clickable,
    }, className);

    return (
      <button
        type="button"
        className={styleClasses}
        disabled={!clickable}
        onClick={this.handleClick}
        {...rest}
      >
        {caption}
      </button>
    );
  }
}

export default Tag;
