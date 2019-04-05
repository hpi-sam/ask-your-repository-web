// @flow
import React, { useState, useEffect, useRef } from 'react';
import { IoIosReturnLeft, IoIosSave } from 'react-icons/io';
import { SubmitButton, SaveButton } from '../../utility/buttons';
import type { Tag } from '../../../models/Tag';

type Props = {
  onTagSubmit: (tag: Tag) => void,
  onSave: () => {},
  isSaveDisabled: boolean,
};

function MobileTaggingInput(props: Props) {
  const [newTag, setNewTag] = useState('');
  const inputElement = useRef(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  function handleChange(e: SyntheticInputEvent<HTMLInputElement>) {
    setNewTag(e.target.value);
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    props.onTagSubmit(newTag);
    setNewTag('');
  }

  return (
    <form onSubmit={handleSubmit} className="MobileTagging__input">
      <input
        type="text"
        className="MobileTagging__input__field"
        value={newTag}
        onChange={handleChange}
        ref={inputElement}
        placeholder="Tag your image!"
        data-cy="tag-input"
      />
      <SubmitButton className="MobileTagging__input__enter-button">
        <IoIosReturnLeft />
      </SubmitButton>
      <SaveButton
        onClick={props.onSave}
        className="MobileTagging__input__save-button"
        disabled={props.isSaveDisabled}
      >
        <IoIosSave />
      </SaveButton>
    </form>
  );
}

export default MobileTaggingInput;
