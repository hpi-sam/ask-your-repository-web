// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTag } from '../../../state/image/image.actionCreators';
import ColorFactory from '../../../factories/ColorFactory';
import type { Tag } from '../../../models/Tag';

type Props = {
  tag: Tag,
  shortcut: string,
  dispatch: Function,
};

class TagSuggestion extends Component<Props> {
  handleClick = () => {
    const { dispatch, tag } = this.props;
    dispatch(addTag(tag));
  };

  render() {
    const { tag, shortcut } = this.props;

    return (
      <button
        onClick={this.handleClick}
        type="button"
        className="TagSuggestions__item"
        style={{ backgroundColor: ColorFactory.fromTag(tag) }}
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

export default connect()(TagSuggestion);
