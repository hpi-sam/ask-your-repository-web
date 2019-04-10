// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import humps from 'humps';
import qs from 'qs';
import { Link } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import UserService from '../../../services/UserService';
import ValidationErrors from '../../utility/form/ValidationErrors';
import type { Errors } from '../../../models/Errors';
import '../Forms.scss';
import { flashErrorMessage, flashSuccessMessage } from 'redux-flash';

type Props = {
  dispatch: Function,
  location: Object,
};

type State = {
  password: string,
  passwordConfirm: string,
  errors: Errors,
};

class ResetPasswordForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      password: '',
      passwordConfirm: '',
      errors: {
        missingInput: false,
        mismatchedPassword: false,
        invalidEmail: false,
      },
    };
  }

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.resetErrors();

    const {
      password,
      passwordConfirm,
    } = this.state;
    const { dispatch } = this.props;

    if (password && passwordConfirm) {
      if (password !== passwordConfirm) {
        this.handleError('mismatchedPassword', true);
        return false;
      }

      const querystring = this.props.location.search;
      const parsedString = qs.parse(querystring, { ignoreQueryPrefix: true });
      const { resetToken } = humps.camelizeKeys(parsedString);
      console.log("Look:");
      console.log(querystring);
      console.log(parsedString);
      console.log(resetToken);

      UserService.changePassword(password, resetToken)
        .then(() => {
          dispatch(flashSuccessMessage('Successfully updated the password.'));
          dispatch(push('/login'));
        })
        .catch((error) => {
          const message = error.response
            ? error.response.data.error
            : 'Could not establish a connection to the server.';

          dispatch(flashErrorMessage(message));
        });
    } else {
      this.handleError('missingInput', true);
    }
    return true;
  };

  handleError = (name: $Keys<Errors>, value: boolean) => {
    this.setState({
      errors: {
        [name]: value,
      },
    });
  };

  resetErrors = () => {
    this.setState({
      errors: {
        missingInput: false,
        mismatchedPassword: false,
        invalidEmail: false,
      },
    });
  };

  printError = () => {
    const error = Object.keys(this.state.errors).find(key => this.state.errors[key] === true);
    if (error) {
      return (
        <ValidationErrors error={error} />
      );
    }
    return false;
  };

  render() {
    const {
      password,
      passwordConfirm,
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="Form">
        <div className="Form__title">Update Password</div>
        {this.printError()}
        <div className="form-input">
          <label className="Form__label">
            Password:
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={this.handleChange}
              data-cy="register-password-input"
            />
          </label>
        </div>
        <div className="form-input">
          <label className="Form__label">
            Confirm Password:
            <Input
              type="password"
              className="form-control"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={this.handleChange}
              data-cy="register-password-repeat-input"
            />
          </label>
        </div>

        <div className="Form__buttons">
          <Button className="Form__buttons__item" data-cy="register-submit-button">
            Update Password
          </Button>
          <Link to="/" className="Form__buttons__cancel">Cancel</Link>
        </div>
      </Form>
    );
  }
}

export default connect()(ResetPasswordForm);
