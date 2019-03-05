// @flow
import React from 'react';
import { DeleteButton, CloseButton } from '../../utility/buttons';

type Props = {
  onDelete: Function,
  onClose: Function,
};

function DeleteImageConfirmation(props: Props) {
  const { onDelete, onClose } = props;

  return (
    <div className="Delete__confirm">
      <div>Do you want to delete this image?</div>
      <div className="Delete__confirm__buttons">
        <CloseButton onClick={onClose}>Cancel</CloseButton>
        <DeleteButton
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
        Yes, Delete it!
        </DeleteButton>
      </div>
    </div>
  );
}

export default DeleteImageConfirmation;
