// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import './Password.scss';

type State = {
  oldPassword: string,
  newPassword: string,
  newPasswordConfirm: string,
};

class Password extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    const { oldPassword, newPassword, newPasswordConfirm } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="ChangePasswordForm">
        <h2>Change Password</h2>
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

export default connect()(Password);
