// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import type { Node } from 'react';
import classNames from 'classnames';
import './Button.scss';

type Props = {
  children: Node,
  to: string,
  type?: string,
  className?: string,
};

function ButtonLink({
  children,
  to,
  className,
  ...rest
}: Props) {
  const styleClasses = classNames('Button', className);

  return (
    <Link
      {...rest}
      to={to}
      className={styleClasses}
    >
      {children}
    </Link>
  );
}

ButtonLink.defaultProps = {
  className: '',
};

export default ButtonLink;
