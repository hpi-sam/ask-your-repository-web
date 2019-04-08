// @flow
import * as React from 'react';
import type { Node } from 'react';
import type { Tag as TagType } from '../../../models/Tag';
import './TagSelector.scss';

type Props = {
  tags: Array<TagType>,
  addTag: (tag: TagType) => void,
  removeTag: (tag: TagType) => void,
  renderTag: (tag: TagType) => Node,
};

type State = {
  tagInputValue: string,
};

class TagSelector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      tagInputValue: '',
    };
  }

  componentDidMount() {
    if (this.tagInput) {
      this.tagInput.focus();
    }
  }

  handleKeyPress = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = event;
    const { tagInputValue } = this.state;

    switch (keyCode) {
      case 188:
        event.preventDefault();
        this.addTag();
        break;
      case 13:
        this.addTag();
        break;
      case 8:
        if (tagInputValue.length === 0) this.removeLastTag();
        break;
      default:
        break;
    }
  };

  handleTagInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ tagInputValue: value });
  };

  removeLastTag() {
    const { removeTag, tags } = this.props;
    removeTag(tags[tags.length - 1]);
  }

  addTag() {
    const { tagInputValue } = this.state;
    if (!tagInputValue) return;
    this.props.addTag(tagInputValue);

    this.setState({ tagInputValue: '' });
  }

  tagInput: ?HTMLInputElement;

  render() {
    const { tags } = this.props;
    const { tagInputValue } = this.state;

    return (
      <div className="TagSelector">
        {tags.map(tag => this.props.renderTag(tag))}
        <div className="Tag TagSelector__input">
          <input
            className="TagSelector__input__control"
            type="text"
            value={tagInputValue}
            onChange={this.handleTagInputChange}
            onKeyDown={this.handleKeyPress}
            ref={(input) => { this.tagInput = input; }}
            data-cy="tag-selector-input"
          />
          <div className="TagSelector__input__content">
            {tagInputValue}
          </div>
        </div>
        {tags.length < 2 && (
          <div className="TagSelector__typing-hint">
            {tags.length === 0 && !tagInputValue && 'Start typing!'}
            {tags.length === 0 && tagInputValue && 'Hit ⏎'}
            {tags.length === 1 && 'Remove with ⌫'}
          </div>
        )}
      </div>
    );
  }
}

export default TagSelector;
