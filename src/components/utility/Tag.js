// @flow
import React, { Component } from 'react';
import { IoIosClose } from 'react-icons/io';
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
  removable?: boolean,
  onRemove: (tag: TagType) => void,
};

class Tag extends Component<Props> {
  static defaultProps = {
    className: '',
    isMultiTag: false,
    clickable: false,
    onClick: () => {},
    removable: false,
    onRemove: () => {},
  };

  handleClick = () => {
    const { caption, onClick } = this.props;
    onClick(caption);
  };

  handleRemoveClick = () => {
    const { caption, onRemove } = this.props;
    onRemove(caption);
  };

  render() {
    const {
      caption,
      className,
      isMultiTag,
      clickable,
      removable,
      onRemove,
      onClick,
      ...rest
    } = this.props;

    const styleClasses = classNames('Tag', ColorFactory.fromTag(caption), {
      'Tag--multi': isMultiTag,
      'Tag--clickable': clickable,
    }, className);

    return (
      <div className={styleClasses}>
        <button
          className="Tag__button"
          type="button"
          disabled={!clickable}
          onClick={this.handleClick}
          {...rest}
        >
          <span className="Tag__caption">
            {caption}
          </span>
        </button>
        {removable && (
          <button
            type="button"
            className="Tag__remove-button"
            data-cy={`tag-remove-button-${caption}`}
            onClick={this.handleRemoveClick}
          >
            <IoIosClose />
          </button>
        )}
      </div>
    );
  }
}

export default Tag;
