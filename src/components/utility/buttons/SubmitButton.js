// @flow
import React from 'react';
import type { Node } from 'react';
import Button from './Button';

type Props = {
  children: Node,
};

function SubmitButton({ children, ...rest }: Props) {
  return (
    <Button
      type="submit"
      data-cy="submit-button"
      {...rest}
    >
      {children}
    </Button>
  );
}

export default SubmitButton;
