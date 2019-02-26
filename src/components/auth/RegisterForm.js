// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import type { UserParams } from '../../models/User';
import { register } from '../../state/auth/auth.actionCreators';
import './RegisterForm.scss';

type Props = {
    dispatch: Function,
}

type State = {
    user: UserParams,
}

class RegisterForm extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        username: '',
        password: '',
      },
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.username && user.email && user.password) {
      dispatch(register(user));
    }
  }

  render() {
    const { user } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="RegisterForm">
        <h1>Register</h1>
        <div className="form-input">
          <label>
            Username:
            <Input
              type="text"
              className="form-control"
              name="username"
              value={user.username}
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
              value={user.email}
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
              value={user.password}
              onChange={this.handleChange}
              data-cy="register-password-input"
            />
          </label>
        </div>
        <div className="form-input">
          <label>
            Repeat Password:
            <Input
              type="password"
              className="form-control"
              name="passwordRepeat"
              onChange={this.handleChange}
              data-cy="register-password-repeat-input"
            />
          </label>
        </div>

        <div className="RegisterForm__buttons">
          <Button data-cy="register-submit-button">
            Register
          </Button>
          <Link to="/login" className="cancel">Cancel</Link>
        </div>
      </Form>
    );
  }
}

export default connect()(RegisterForm);
