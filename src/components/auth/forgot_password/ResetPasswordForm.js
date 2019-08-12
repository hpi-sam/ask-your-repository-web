// @flow
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import humps from 'humps';
import qs from 'qs';
import { Link } from 'react-router-dom';
import { flashErrorMessage, flashSuccessMessage } from 'redux-flash';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import UserService from '../../../services/UserService';
import ValidationErrors from '../../utility/form/ValidationErrors';
import type { Errors } from '../../../models/Errors';

type Props = {
  location: Object,
};

const ResetPasswordForm = (props: Props) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState<Errors>({
    missingInput: false,
    mismatchedPassword: false,
    invalidEmail: false,
  });

  const resetErrors = () => {
    setErrors({
      missingInput: false,
      mismatchedPassword: false,
      invalidEmail: false,
    });
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetErrors();

    if (password && passwordConfirm) {
      if (password !== passwordConfirm) {
        setErrors({ ...errors, mismatchedPassword: true });
        return false;
      }

      const querystring = props.location.search;
      const parsedString = qs.parse(querystring, { ignoreQueryPrefix: true });
      const { resetToken } = humps.camelizeKeys(parsedString);
      const token: any = resetToken;

      try {
        await UserService.changePassword(password, token);
        dispatch(flashSuccessMessage('Successfully updated the password.'));
        dispatch(push('/login'));
      } catch (error) {
        const message = error.response
          ? error.response.data.error
          : 'Could not establish a connection to the server.';

        dispatch(flashErrorMessage(message));
      }
    } else {
      setErrors({ ...errors, missingInput: true });
    }
    return true;
  };

  const printError = () => {
    const error = Object.keys(errors).find(key => errors[key]);
    return error
      ? <ValidationErrors error={error} />
      : false;
  };

  return (
    <Form onSubmit={handleSubmit} className="Form Form__centered">
      <div className="Form__title">Update Password</div>
      {printError()}
      <div className="Form__input">
        <label className="Form__input__label">
          Password:
          <Input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            data-cy="register-password-input"
          />
        </label>
      </div>
      <div className="Form__input">
        <label className="Form__input__label">
          Confirm Password:
          <Input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            data-cy="register-password-repeat-input"
          />
        </label>
      </div>

      <div className="Form__buttons">
        <Button
          className="Form__buttons__item Form__buttons__item__blue"
          data-cy="register-submit-button"
        >
          Update Password
        </Button>
        <Link
          to="/"
          className="Form__buttons__item Form__buttons__item__gray"
        >
          Cancel
        </Link>
      </div>
    </Form>
  );
};

export default ResetPasswordForm;
