// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import GoogleLogin from './GoogleLogin';
import ValidationErrors from '../utility/form/ValidationErrors';
import { login } from '../../state/auth/auth.actionCreators';
import type { Errors } from '../../models/Errors';
import './Forms.scss';

type Props = {
  dispatch: Function,
};

type State = {
  email: string,
  password: string,
  errors: Errors,
};

class LoginForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {
        missingInput: false,
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

    const { email, password } = this.state;
    const { dispatch } = this.props;

    if (email && password) {
      dispatch(login(email, password));
    }
    else {
      this.handleError('missingInput', true);
    }
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
      },
    });
  };

  isValidEmail = (email: string) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
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
    const { email, password } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="Form">
        <div className="Form__title">Login</div>
        <div className="Form__external-login">
          <GoogleLogin />
        </div>
        <hr className="Form__separator" data-content="OR" />
        {this.printError()}
        <div className="form-input">
          <label className="Form__label">
            Email or Username:
            <Input
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}
              data-cy="login-email-input"
            />
          </label>
        </div>
        <div className="form-input">
          <label className="Form__label">
            Password:
            <Input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              data-cy="login-password-input"
            />
          </label>
        </div>
        <div>
          <Link className="Form__link" to="/register">
            No account yet? Register here.
          </Link>
        </div>
        <div className="Form__buttons">
          <Button className="Form__buttons__item" data-cy="login-submit-button">
            Login
          </Button>
          <Link to="/" className="Form__buttons__cancel">Cancel</Link>
        </div>
      </Form>
    );
  }
}

export default connect()(LoginForm);
