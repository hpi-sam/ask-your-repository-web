// @flow
import * as React from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import type { Tag } from '../models/Tag';
import TagFactory from '../factories/TagFactory';
import { addTag, removeLastTag } from '../state/image/image.actionCreators';
import type { AppState } from '../state/AppState';
import './TagSelector.scss';

type Props = {
  tags: ?Array<Tag>,
  dispatch: Function,
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
        if (tagInputValue.length === 0) {
          this.props.dispatch(removeLastTag());
        }
        break;
      default:
        break;
    }
  };

  handleTagInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ tagInputValue: value });
  };

  addTag() {
    const { tagInputValue } = this.state;
    if (!tagInputValue) return;

    const newTag = TagFactory.createTag(tagInputValue);
    this.props.dispatch(addTag(newTag));

    this.setState({ tagInputValue: '' });
  }

  tagInput: ?HTMLInputElement;

  render() {
    const { tags } = this.props;
    if (!tags) return null;

    const { tagInputValue } = this.state;

    return (
      <div className="TagSelector">
        {tags.map(tag => (
          <div
            key={shortid.generate()}
            className="TagSelector__tag"
            style={{ backgroundColor: tag.color }}
          >
            {tag.caption}
          </div>
        ))}
        <div className="TagSelector__tag TagSelector__input">
          <input
            className="TagSelector__input__control"
            type="text"
            value={tagInputValue}
            onChange={this.handleTagInputChange}
            onKeyDown={this.handleKeyPress}
            ref={(input) => { this.tagInput = input; }}
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

const mapStateToProps = (state: AppState) => ({
  tags: state.image && state.image.tags,
});

export default connect(mapStateToProps)(TagSelector);
