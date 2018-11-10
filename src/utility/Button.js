/* eslint-disable react/button-has-type */
// because of https://github.com/yannickcr/eslint-plugin-react/issues/1555

// @flow
import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import './Button.scss';

type Props = {
  children: Node,
  type?: string,
  className?: string,
};

function Button({
  children,
  type,
  className,
  ...rest
}: Props) {
  const styleClasses = classNames('Button', className);

  return (
    <button
      {...rest}
      className={styleClasses}
      type={type}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  className: '',
};

export default Button;
