// @flow
import React from 'react';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import { MdClear } from 'react-icons/md';
import './Modal.scss';

type Props = {
  children: React$Node,
  onClose: Function,
  isOpen: boolean,
  contentClassName: string,
  overlayClassName: string,
};

function Modal(props: Props) {
  function handleCloseClick() {
    props.onClose();
  }

  return (
    <ReactModal
      isOpen={props.isOpen}
      className={classNames('Modal__content', props.contentClassName)}
      overlayClassName={classNames('Modal__overlay', props.overlayClassName)}
      onRequestClose={props.onClose}
    >
      {props.children}
    </ReactModal>
  );
}

Modal.defaultProps = {
  withContentClose: true,
  withOverlayClose: false,
  isOpen: true,
  onClose: () => {},
};

export default Modal;
