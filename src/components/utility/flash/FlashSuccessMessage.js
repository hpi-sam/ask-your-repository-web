// @flow
import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import FlashMessage from './FlashMessage';

type Props = {
  children: Node,
  className?: string,
};

function FlashSuccessMessage({
  children,
  className,
  ...rest
}: Props) {
  const styleClasses = classNames('FlashMessage--success', className);

  return (
    <FlashMessage className={styleClasses} {...rest}>
      {children}
    </FlashMessage>
  );
}

FlashSuccessMessage.defaultProps = {
  className: '',
};

export default FlashSuccessMessage;
