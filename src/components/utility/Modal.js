// @flow
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { MdClear } from 'react-icons/md';
import './Modal.scss';

type Props = {
  children: React$Node,
  close: boolean,
};

type State = {
  modalIsOpen: boolean,
};

class Modal extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      modalIsOpen: true,
    };
  }

  openModal = () => {
    this.setState({
      modalIsOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  };

  render() {
    const { children, close } = this.props;

    return (
      <ReactModal
        isOpen={this.state.modalIsOpen}
        className="ModalView__modal"
        overlayClassName="ModalView__overlay"
        ariaHideApp={false}
      >
        {close && (
          <button
            type="button"
            onClick={this.closeModal}
            className="ModalView__close"
          >
            <MdClear />
          </button>
        )}
        <div className="ModalView__content">
          {children}
        </div>
      </ReactModal>
    );
  }
}

export default Modal;
