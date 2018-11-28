// @flow
import React from 'react';
import type { Node } from 'react';
import Message from './Message';

type Props = {
  children: Node,
};

function ErrorMessage({ children }: Props) {
  return (
    <Message className="Message--error">
      {children}
    </Message>
  );
}

export default ErrorMessage;
