// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import User from '../../models/User';
import { register } from '../../state/auth/auth.actionCreators';
import './RegisterPage.scss';

type Props = {
    dispatch: Function,
}

type State = {
    user: User,
    submitted: boolean,
}

class RegisterPage extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
      },
      submitted: false,
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

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.username && user.email && user.password) {
      dispatch(register(user));
    }
  }

  render() {
    // const { registering } = this.props;
    const { user, submitted } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="RegisterForm">
        <h1>Register</h1>
        <div className="form-input">
          <label>
            Username:
            <Input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
          </label>
        </div>
        <div className="form-input">
          <label>
            Email:
            <Input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
          </label>
        </div>
        <div className="form-input">
          <label>
            Password:
            <Input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
          </label>
        </div>
        <div className="form-input">
          <label>
            Repeat Password:
            <Input type="password" className="form-control" name="passwordRepeat" onChange={this.handleChange} />
          </label>
        </div>

        <div className="RegisterForm__buttons">
          <Button>Register</Button>
          <Link to="/login" className="cancel">Cancel</Link>
        </div>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  // const { registering } = state.registration;
  // return {
  // registering,
  // };
}

export default connect(mapStateToProps)(RegisterPage);
