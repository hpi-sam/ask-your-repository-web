// @flow
import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import FlashMessage from './FlashMessage';

type Props = {
  children: Node,
  className?: string,
};

function FlashErrorMessage({
  children,
  className,
  ...rest
}: Props) {
  const styleClasses = classNames('FlashMessage--error', className);

  return (
    <FlashMessage className={styleClasses} {...rest}>
      {children}
    </FlashMessage>
  );
}

FlashErrorMessage.defaultProps = {
  className: '',
};

export default FlashErrorMessage;
