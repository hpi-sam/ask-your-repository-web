// @flow
import React from 'react';
import './Menu.scss';

type Props = {
  close: Function,
};

function MenuItems(props: Props) {
  return (
    <div className="menu">
      <ul>        
        <li onClick={props.close}><a href="./">Add New Artifact</a></li>
        <li onClick={props.close}><a href="./images">View All</a></li>
      </ul>
    </div>
  );
}

export default MenuItems;
