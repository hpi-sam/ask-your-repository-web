// @flow
import { useState, useEffect } from 'react';
import TagService from '../../../services/TagService';
import type { Tag } from '../../../models/Tag';
import type { Team } from '../../../models/Team';

function useTagSuggestions(team: ?Team, tags: Tag[]) {
  const [suggestions, setSuggestions] = useState([]);

  async function fetchSuggestions() {
    if (!team) return;
    const suggestedTags = await TagService.suggested(team.id, tags);
    setSuggestions(suggestedTags);
  }

  useEffect(() => {
    fetchSuggestions();
  }, [tags]);

  return suggestions;
}

export default useTagSuggestions;
