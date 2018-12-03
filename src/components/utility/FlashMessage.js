// @flow
import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import './FlashMessage.scss';

type Props = {
  children: Node,
  className?: string,
};

function FlashMessage({ children, className }: Props) {
  const styleClasses = classNames('FlashMessage', className);

  return (
    <div className={styleClasses}>
      {children}
    </div>
  );
}

FlashMessage.defaultProps = {
  className: '',
};

export default FlashMessage;
