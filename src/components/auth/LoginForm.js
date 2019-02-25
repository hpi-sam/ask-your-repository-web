// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import { login } from '../../state/auth/auth.actionCreators';
import './LoginForm.scss';

type Props = {
  dispatch: Function,
}

type State = {
  email: string,
  password: string,
}

class LoginForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(login(email, password));
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="LoginForm">
        <h1>Login</h1>
        <div className="form-input">
          <label>
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
          <label>
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
          <Link to="/register">No account yet? Register here.</Link>
        </div>
        <div>
          <Button data-cy="login-submit-button">
            Submit
          </Button>
        </div>
      </Form>
    );
  }
}

export default connect()(LoginForm);
