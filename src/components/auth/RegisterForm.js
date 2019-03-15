// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
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
  missingInput: boolean,
  mismatchedPassword: boolean,
  invalidEmail: boolean,
};

class RegisterForm extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
      missingInput: false,
      mismatchedPassword: false,
      invalidEmail: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
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
  }

  handleError = (name, value) => {
    this.setState({
        [name]: value,
    });
  }

  resetErrors = () => {
    this.setState({
      mismatchedPassword: false,
      missingInput: false,
      invalidEmail: false,
    });
  }

  isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  render() {
    const {
      email,
      username,
      password,
      passwordConfirm,
      missingInput,
      mismatchedPassword,
      invalidEmail,
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="Form">
        <h1>Register</h1>
        {missingInput ? (
          <p>Please fill in all fields. </p>
        ) : ''}
        {invalidEmail ? (
          <p>Please provide a valid email address. </p>
        ) : ''}
        {mismatchedPassword ? (
          <p>Passwords do not match. </p>
        ) : ''}
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
