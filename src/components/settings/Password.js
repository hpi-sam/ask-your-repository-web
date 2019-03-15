// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import { changePassword } from '../../state/auth/auth.actionCreators';
import type { User } from '../../models/User';
import type { AppState } from '../../state/AppState';
import './Password.scss';

type Props = {
  dispatch: Function,
  user: User,
};

type State = {
  oldPassword: string,
  newPassword: string,
  newPasswordConfirm: string,
  errors: Object,
};

class Password extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      missingInput: false,
      mismatchedPassword: false,
      errors: {
        missingInput: false,
        mismatchedPassword: false,
        samePassword: false,
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.resetErrors();

    const { oldPassword, newPassword, newPasswordConfirm } = this.state;
    const { dispatch, user } = this.props;

    if (oldPassword && newPassword && newPasswordConfirm) {
      if (newPassword !== newPasswordConfirm) {
        this.handleError('mismatchedPassword', true);
        return false;
      }
      if (oldPassword == newPassword) {
        this.handleError('samePassword', true);
        return false;
      }
      dispatch(changePassword(user.id, oldPassword, newPassword));
    } else {
      this.handleError('missingInput', true);
    }
    return true;
  }

  handleError = (name, value) => {
    this.setState({
      errors: {
        [name]: value,
      },
    });
  }

  resetErrors = () => {
    this.setState({
      errors: {
        missingInput: false,
        mismatchedPassword: false,
        samePassword: false,
      },
    });
  }

  printError() {
    const errorMessages = {
      'mismatchedPassword': 'Passwords do not match.',
      'missingInput': 'Please fill in all fields.',
      'samePassword': 'Your new password cannot be the same as your old one.',
    }
    const errors = Object.keys(this.state.errors);
    for (let i in errors) {
      if (this.state.errors[errors[i]]) {
        return (<p> {errorMessages[errors[i]]} </p>);
      }
    }
  }

  render() {
    const {
      oldPassword,
      newPassword,
      newPasswordConfirm,
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="ChangePasswordForm">
        <h2>Change Password</h2>
        {this.printError()}
        <div className="form-input">
          <label>
            Old password:
            <Input
              type="password"
              name="oldPassword"
              value={oldPassword}
              onChange={this.handleChange}
              data-cy="change-password-old-password-input"
            />
          </label>
        </div>
        <div className="form-input">
          <label>
            New password:
            <Input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={this.handleChange}
              data-cy="change-password-new-password-input"
            />
          </label>
        </div>
        <div className="form-input">
          <label>
            Confirm new password:
            <Input
              type="password"
              name="newPasswordConfirm"
              value={newPasswordConfirm}
              onChange={this.handleChange}
              data-cy="change-password-new-password-confirm-input"
            />
          </label>
        </div>
        <div>
          <Button data-cy="change-password-submit-button">
            Submit
          </Button>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Password);
