// @flow
import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import './Message.scss';

type Props = {
  children: Node,
  className?: string,
};

function Message({ children, className }: Props) {
  const styleClasses = classNames('Message', className);

  return (
    <div className={styleClasses}>
      {children}
    </div>
  );
}

Message.defaultProps = {
  className: '',
};

export default Message;
