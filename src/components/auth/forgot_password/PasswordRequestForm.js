// @flow
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { flashErrorMessage, flashSuccessMessage } from 'redux-flash';
import { Link } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import ValidationErrors from '../../utility/form/ValidationErrors';
import type { Errors } from '../../../models/Errors';
import AuthService from '../../../services/AuthService';

const PasswordRequestForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Errors>({ missingInput: false });

  const resetErrors = () => {
    setErrors({
      missingInput: false,
    });
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetErrors();

    if (email) {
      try {
        await AuthService.requestResetLink(email);
        dispatch(flashSuccessMessage('Successfully requested a password request. Please check your emails for the reset link.'));
        dispatch(push('/login'));
      } catch (error) {
        const message = error.response
          ? error.response.data.error
          : 'Could not establish a connection to the server.';

        dispatch(flashErrorMessage(message));
      }
    } else {
      setErrors({ missingInput: true });
    }
  };

  const printError = () => {
    const error = Object.keys(errors).find(key => errors[key]);

    return error
      ? <ValidationErrors error={error} />
      : null;
  };

  return (
    <Form onSubmit={handleSubmit} className="Form Form__centered">
      <div className="Form__title">Reset Password</div>
      {printError()}
      <div className="Form__input">
        <label className="Form__input__label">
          Email or Username:
          <Input
            type="text"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div className="Form__buttons">
        <Button className="Form__buttons__item Form__buttons__item__blue">
          Submit
        </Button>
        <Link to="/login" className="Form__buttons__item Form__buttons__item__gray">Cancel</Link>
      </div>
    </Form>
  );
};

export default PasswordRequestForm;
