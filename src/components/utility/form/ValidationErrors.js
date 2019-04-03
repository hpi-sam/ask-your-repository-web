// @flow
import React from 'react';
import './ValidationErrors.scss';

type Props = {
  error: string,
};

function ValidationErrors(props: Props) {
  const { error } = props;

  const errorMessages = {
    mismatchedPassword: 'Passwords do not match.',
    missingInput: 'Please fill in all fields.',
    samePassword: 'Your new password cannot be the same as your old one.',
    invalidEmail: 'Please provide a valid email address.',
  };
  return (
    <div className="ValidationErrors">
      {errorMessages[error]}
    </div>
  );
}

export default ValidationErrors;
