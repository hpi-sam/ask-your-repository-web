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
        <li id="btnUpload" onClick={props.close}><a href="./">Add New Artifact</a></li>
        <li id="btnViewAll" onClick={props.close}><a href="./images">View All</a></li>
      </ul>
    </div>
  );
}

export default MenuItems;
