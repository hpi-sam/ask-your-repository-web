// @flow
import React from 'react';
import { MdClear } from 'react-icons/md';
import classNames from 'classnames';
import Modal from './Modal';
import Button from '../buttons/Button';
import './OverlayModal.scss';

type Props = {
  children: React$Node,
  overlayClassName: string,
  contentClassName: String,
  withClose: boolean,
  onClose: Function,
};

function OverlayModal({
  children,
  contentClassName,
  overlayClassName,
  withClose,
  onClose,
  ...rest
}: Props) {
  return (
    <Modal
      overlayClassName={classNames('OverlayModal__overlay', overlayClassName)}
      contentClassName={classNames('OverlayModal__content', contentClassName)}
      onClose={onClose}
      {...rest}
    >
      <Button
        type="button"
        onClick={onClose}
        className="OverlayModal__close"
      >
        <MdClear />
      </Button>
      {children}
    </Modal>
  );
}

OverlayModal.defaultProps = {
  overlayClassName: '',
  contentClassName: '',
  withClose: true,
  onClose: () => {},
};

export default OverlayModal;
