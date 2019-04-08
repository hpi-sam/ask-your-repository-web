// @flow
import React, { Component } from 'react';
import Modal from 'react-modal';
import { MdClear } from 'react-icons/md';
import './Modal.scss';

type Props = {
  children: React$Node,
  close: boolean,
};

type State = {
  modalIsOpen: boolean,
};

class ModalWindow extends Component<Props, State> {
  constructor() {
    super();

    Modal.setAppElement('#App');

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
      <Modal
        isOpen={this.state.modalIsOpen}
        className="ModalView__modal"
        overlayClassName="ModalView__overlay"
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
      </Modal>
    );
  }
}

export default ModalWindow;
