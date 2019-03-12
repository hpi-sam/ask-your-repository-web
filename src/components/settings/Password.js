// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import { changePassword } from '../../state/auth/auth.actionCreators';
import type { User } from '../../models/User';
import './Password.scss';

type Props = {
  dispatch: Function,
  user: User,
};

type State = {
  oldPassword: string,
  newPassword: string,
  newPasswordConfirm: string,
  missingInput: boolean,
  mismatchedPassword: boolean,
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
        this.handleMismatchedPassword();
        return false;
      }
      dispatch(changePassword(user.id, oldPassword, newPassword));
    } else {
      this.handleMissingInput();
    }
    return true;
  }

  handleMissingInput = () => {
    this.setState({
      missingInput: true,
    });
  }

  handleMismatchedPassword = () => {
    this.setState({
      mismatchedPassword: true,
    });
  }

  resetErrors = () => {
    this.setState({
      mismatchedPassword: false,
      missingInput: false,
    });
  }

  render() {
    const {
      oldPassword,
      newPassword,
      newPasswordConfirm,
      missingInput,
      mismatchedPassword,
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="ChangePasswordForm">
        <h2>Change Password</h2>
        {missingInput ? (
          <p>Please fill in all fields. </p>
        ) : ''}

        {mismatchedPassword ? (
          <p>Passwords do not match. </p>
        ) : ''}
        <div className="form-input">
          <label>
            Old password:
            <Input
              type="password"
              name="oldPassword"
              value={oldPassword}
              onChange={this.handleChange}
              data-cy="changePassword-oldPassword-input"
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
              data-cy="changePassword-newPassword-input"
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
              data-cy="changePassword-newPassword-confirm-input"
            />
          </label>
        </div>
        <div>
          <Button data-cy="changePassword-submit-button">
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
