// @flow
import React, { Component } from 'react';
import shortid from 'shortid';
import _ from 'lodash';
import TagService from '../../../services/TagService';
import TagSuggestion from './TagSuggestion';
import type { Tag } from '../../../models/Tag';
import './TagSuggestions.scss';
import type { AppState } from '../../../state/AppState';
import { connect } from "react-redux";
import type { Team } from '../../../models/Team';

type Props = {
  activeTeam: ?Team,
  tags: Array<Tag>,
  addTag: (tag: Tag) => void,
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

  componentDidUpdate(prevProps: Props) {
    if (!_.isEqual(this.props.tags, prevProps.tags)) {
      this.fetchSuggestions(this.props.tags);
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
    this.props.addTag(suggestion.tag);
  };

  async fetchSuggestions(tags: Tag[]) {
    const { activeTeam } = this.props;
    if (!activeTeam) return;
    const suggestedTags = await TagService.suggested(activeTeam.id, tags);

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
            onClick={this.props.addTag}
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
  activeTeam: state.activeTeam,
});

export default connect(mapStateToProps)(TagSuggestions);
