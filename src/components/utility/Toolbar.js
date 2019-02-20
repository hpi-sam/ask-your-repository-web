// @flow
import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import './Toolbar.scss';

type Props = {
  className: string,
  children?: Node,
  left?: Node,
  right?: Node,
};

function Toolbar({
  children,
  className,
  left,
  right,
}: Props) {
  const styleClasses = classNames('Toolbar', className);

  return (
    <menu className={styleClasses}>
      {left && (
        <div className="Toolbar__left">
          {left}
        </div>
      )}
      {right && (
        <div className="Toolbar__right">
          {right}
        </div>
      )}
      {children || null}
    </menu>
  );
}

Toolbar.defaultProps = {
  className: '',
};

export default Toolbar;
