// @flow
import { useState } from 'react';
import type { Tag } from '../models/Tag';

function useMultiTags(
  onAdd: (multiTag: Tag) => void = () => {},
  onRemove: (multiTag: Tag) => void = () => {},
) {
  const [multiTags, setMultiTags] = useState([]);

  function addMultiTag(multiTag: Tag) {
    setMultiTags(prev => [...prev, multiTag]);
    onAdd(multiTag);
  }

  function removeMultiTag(multiTag: Tag) {
    setMultiTags(prev => prev.filter<Tag>(existingMultiTag => existingMultiTag !== multiTag));
    onRemove(multiTag);
  }

  return {
    multiTags,
    addMultiTag,
    removeMultiTag,
  };
}

export default useMultiTags;
