// @flow
import React from 'react';
import Modal from './Modal';
import SaveButton from './buttons/SaveButton';
import DeleteButton from './buttons/DeleteButton';
import './Modal.scss';

type Props = {
  children: React$Node,
  onCancel: Function,
  onContinue: Function,
};

function ConfirmModal(props: Props) {
  return (
    <Modal>
      {props.children}
      <div className="ModalView__modal__buttonbar">
        <SaveButton onClick={props.onContinue}> Continue </SaveButton>
        <DeleteButton onClick={props.onCancel}> Cancel </DeleteButton>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
