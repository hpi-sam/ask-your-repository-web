// @flow
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import TagSuggestion from './TagSuggestion';
import useTagSuggestions from '../../../hooks/useTagSuggestions';
import type { Tag } from '../../../models/Tag';
import './TagSuggestions.scss';
import type { AppState } from '../../../state/AppState';
import type { Team } from '../../../models/Team';

type Props = {
  activeTeam: ?Team,
  tags: Array<Tag>,
  onSuggestionClick: (tag: Tag) => void,
};

function TagSuggestions(props: Props) {
  const suggestions = useTagSuggestions(props.activeTeam, props.tags);

  const handleKeyPress = (event: SyntheticKeyboardEvent<*>) => {
    const index = parseInt(event.key, 10) - 1;
    const suggestion = suggestions[index];
    if (!suggestion) return;

    event.preventDefault();
    props.onSuggestionClick(suggestion);
  };

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  });

  return (
    <div className="TagSuggestions">
      {suggestions.map((tag, index) => (
        <TagSuggestion
          onClick={props.onSuggestionClick}
          tag={tag}
          shortcut={(index + 1).toString()}
          key={shortid.generate()}
        />
      ))}
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  activeTeam: state.activeTeam,
});

export default connect(mapStateToProps)(TagSuggestions);
