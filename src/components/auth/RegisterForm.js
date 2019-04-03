// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import ValidationErrors from '../utility/form/ValidationErrors';
import type { UserCreateParams } from '../../models/User';
import { register } from '../../state/auth/auth.actionCreators';
import './Forms.scss';

type Props = {
  dispatch: Function,
};

type State = {
  email: string,
  username: string,
  oldPassword: string,
  newPassword: string,
  newPasswordConfirm: string,
  errors: Object,
};

class RegisterForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      username: '',
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

    const { email, username, password, passwordConfirm } = this.state;
    const { dispatch } = this.props;

    if (email && username && password && passwordConfirm) {
      if (password !== passwordConfirm) {
        this.handleError('mismatchedPassword', true);
        return false;
      }

      if (!this.isValidEmail(email)) {
        this.handleError('invalidEmail', true);
        return false;
      }

      const user = {
        email: email,
        username: username,
        password: password
      }
      dispatch(register(user));
    } else {
      this.handleError('missingInput', true);
    }
    return true;
  };

  handleError = (name: string, value: boolean) => {
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

  isValidEmail = (email: string) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  printError = () => {
    const errors = Object.keys(this.state.errors);
    if (errors) {
      return (
        <ValidationErrors error={errors[0]} />
      );
    }
    return false;
  };

  render() {
    const {
      email,
      username,
      password,
      passwordConfirm,
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="Form">
        <h1>Register</h1>
        {this.printError()}
        <div className="form-input">
          <label>
            Username:
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={this.handleChange}
              data-cy="register-username-input"
            />
          </label>
        </div>
        <div className="form-input">
          <label>
            Email:
            <Input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={this.handleChange}
              data-cy="register-email-input"
            />
          </label>
        </div>
        <div className="form-input">
          <label>
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
          <label>
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
          <Button data-cy="register-submit-button">
            Register
          </Button>
          <Link to="/" className="cancel">Cancel</Link>
        </div>
      </Form>
    );
  }
}

export default connect()(RegisterForm);
