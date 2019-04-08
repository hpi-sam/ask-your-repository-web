// @flow
import { useState } from 'react';
import type { Tag } from '../../models/Tag';

type State<S> = [S, ((S => S) | S) => void];

function useMultiTags(
  onAdd: (multiTag: Tag) => void = () => {},
  onRemove: (multiTag: Tag) => void = () => {},
) {
  const [multiTags, setMultiTags]: State<Tag[]> = useState([]);

  function addMultiTag(multiTag: Tag) {
    setMultiTags(prev => [...prev, multiTag]);
    onAdd(multiTag);
  }

  function removeMultiTag(multiTag: Tag) {
    setMultiTags(prevTags => prevTags.filter(tag => tag !== multiTag));
    onRemove(multiTag);
  }

  return {
    multiTags,
    addMultiTag,
    removeMultiTag,
  };
}

export default useMultiTags;
