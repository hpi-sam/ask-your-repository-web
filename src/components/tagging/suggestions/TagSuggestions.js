// @flow
import React, { Component } from 'react';
import shortid from 'shortid';
import _ from 'lodash';
import { connect } from 'react-redux';
import TagService from '../../../services/TagService';
import TagSuggestion from './TagSuggestion';
import { addTag } from '../../../state/image/image.actionCreators';
import type { Tag } from '../../../models/Tag';
import type { AppState } from '../../../state/AppState';
import './TagSuggestions.scss';

type Props = {
  dispatch: Function,
  tags: Array<Tag>,
};

type State = {
  suggestions: Array<{
    shortcut: string,
    tag: Tag,
  }>,
};

class TagSuggestions extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      suggestions: [],
    };
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeyPress);
    this.fetchSuggestions(this.props.tags);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.tags, nextProps.tags)) {
      this.fetchSuggestions(nextProps.tags);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeyPress);
  }

  handleKeyPress = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    const { suggestions } = this.state;
    const suggestion = suggestions.find(item => item.shortcut === key);

    if (!suggestion) return;

    event.preventDefault();
    this.props.dispatch(addTag(suggestion.tag));
  };

  async fetchSuggestions(tags: Tag[]) {
    const suggestedTags = await TagService.suggested(tags);

    this.setState({
      suggestions: suggestedTags.map((tag, index) => ({
        tag,
        shortcut: (index + 1).toString(),
      })),
    });
  }

  render() {
    const { suggestions } = this.state;

    return (
      <div className="TagSuggestions">
        {suggestions.map(suggestion => (
          <TagSuggestion
            tag={suggestion.tag}
            shortcut={suggestion.shortcut}
            key={shortid.generate()}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  tags: state.image ? state.image.tags : [],
});

export default connect(mapStateToProps)(TagSuggestions);
