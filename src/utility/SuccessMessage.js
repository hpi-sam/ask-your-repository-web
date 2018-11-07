// @flow
import React from 'react';
import type { Node } from 'react';
import Message from './Message';

type Props = {
  children: Node,
};

function SuccessMessage({ children }: Props) {
  return (
    <Message className="Message--success">
      {children}
    </Message>
  );
}

export default SuccessMessage;
