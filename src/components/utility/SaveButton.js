// @flow
import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import Button from './Button';

type Props = {
  children: Node,
  className?: string,
};

function SaveButton({
  children,
  className,
  ...rest
}: Props) {
  const styleClasses = classNames('Button--save', className);

  return (
    <Button className={styleClasses} {...rest}>
      {children}
    </Button>
  );
}

SaveButton.defaultProps = {
  className: '',
};

export default SaveButton;
