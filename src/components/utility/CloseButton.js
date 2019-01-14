// @flow
import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import Button from './Button';

type Props = {
  children: Node,
  className?: string,
};

function CloseButton({
  children,
  className,
  ...rest
}: Props) {
  const styleClasses = classNames('Button--close', className);

  return (
    <Button
      className={styleClasses}
      data-cy="close-button"
      {...rest}
    >
      {children}
    </Button>
  );
}

CloseButton.defaultProps = {
  className: '',
};

export default CloseButton;
