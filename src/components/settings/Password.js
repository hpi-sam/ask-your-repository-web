// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
//import { changePassword } from '../../state/auth/auth.changePassword';
import './Password.scss';

type Props = {
  dispatch: Function,
};

type State = {
  oldPassword: string,
  newPassword: string,
  newPasswordConfirm: string,
  missingInput: boolean,
};

class Password extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      missingInput: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, newPasswordConfirm } = this.state;
    const { dispatch } = this.props;

    if (oldPassword && newPassword && newPasswordConfirm) {
      if (newPassword !== newPasswordConfirm) {
        this.handleIncorrectInput();
        return false;
      }
      //dispatch(changePassword(oldPassword, newPassword));
    }
    else {
      this.handleMissingInput();
    }
    return true;
  }

  handleMissingInput = () => {
    this.setState({
      missingInput: true,
    });
  }

  handleIncorrectInput = () => {

  }

  render() {
    const {
      oldPassword,
      newPassword,
      newPasswordConfirm,
      missingInput
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="ChangePasswordForm">
        <h2>Change Password</h2>
        {missingInput ? (
          <p>Please fill in all fields. </p>
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

export default connect()(Password);
