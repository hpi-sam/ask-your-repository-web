// @flow
import React from 'react';
import './ListEmpty.scss';

type Props = {
  children: React$Node,
};

function ListEmpty(props: Props) {
  return (
    <div className="ListEmpty">
      {props.children}
    </div>
  );
}

export default ListEmpty;
