// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import { login, logout } from '../../state/auth/auth.actionCreators';
import './LoginPage.scss';

type Props = {
    dispatch: Function,
}

type State = {
    email: string,
    password: string,
    submitted: boolean,
}

class LoginPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // reset login status
    this.props.dispatch(logout());

    this.state = {
      email: '',
      password: '',
      submitted: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(login(email, password));
    }
  }

  render() {
    // const { loggingIn } = this.props;
    const { email, password, submitted } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="LoginForm">
        <h1>Login</h1>
        <div className="form-input">
          <label htmlFor="email">
            Email:
            <Input type="text" name="email" value={email} onChange={this.handleChange} />
          </label>
        </div>
        <div className="form-input">
          <label>
            Password:
            <Input type="password" name="password" value={password} onChange={this.handleChange} />
          </label>
        </div>
        <div>
          <Link to="/register">No account yet? Register here.</Link>
        </div>
        <div>
          <Button>Submit</Button>
        </div>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  // const { loggingIn } = state.authentication;
  // return {
  // loggingIn,
  // };
}

export default connect(mapStateToProps)(LoginPage);
