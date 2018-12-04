// @flow
import React from 'react';
import Popup from 'reactjs-popup';
import MenuIcon from './MenuIcon';
import MenuItems from './MenuItems';
import './Menu.scss';

const contentStyle = {
  background: "rgba(255,255,255,0",
  width: "80%",
  border: "none"
};

const overlayStyle = {
  background: 'rgba(255,255,255,0.98'
};

function Menu() {
  return (
    <Popup
      modal
      overlayStyle={overlayStyle}
      contentStyle={contentStyle}
      closeOnDocumentClick={false}
      trigger={open => <MenuIcon open={open} />}
    >
      {close => <MenuItems close={close} />}
    </Popup>
  );
}

export default Menu;
