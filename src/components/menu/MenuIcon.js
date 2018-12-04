// @flow
import React from 'react';
import './Menu.scss';

type Props = {
  open: boolean,
};

function MenuIcon({ open, ...props }: Props) {
  const menuClass = open ? 'burger-menu open' : 'burger-menu';
  return (
    <div className={menuClass} {...props}>
      <div className="bar1" key="b1" />
      <div className="bar2" key="b2" />
      <div className="bar3" key="b3" />
    </div>
  );
}

export default MenuIcon;
