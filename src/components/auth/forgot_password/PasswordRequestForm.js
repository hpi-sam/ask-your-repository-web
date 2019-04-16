// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { flashErrorMessage, flashSuccessMessage } from 'redux-flash';
import { Link } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import ValidationErrors from '../../utility/form/ValidationErrors';
import type { Errors } from '../../../models/Errors';
import AuthService from '../../../services/AuthService';

type Props = {
  dispatch: Function,
};

type State = {
  email: string,
  errors: Errors,
};

class PasswordRequestForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      errors: {
        missingInput: false,
      },
    };
  }

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.resetErrors();

    const { email } = this.state;
    const { dispatch } = this.props;

    if (email) {
      try {
        await AuthService.requestResetLink(email);
        dispatch(flashSuccessMessage('Successfully requested a password request. Please check your emails for the reset link.'));
        dispatch(push('/login'));
      } catch (error) {
        const message = error.response
          ? error.response.data.error
          : 'Could not establish a connection to the server.';

        dispatch(flashErrorMessage(message));
      }
    } else {
      this.handleError('missingInput', true);
    }
  };

  handleError = (name: $Keys<Errors>, value: boolean) => {
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
    const { email } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="Form Form__centered">
        <div className="Form__title">Reset Password</div>
        {this.printError()}
        <div className="Form__input">
          <label className="Form__input__label">
            Email or Username:
            <Input
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className="Form__buttons">
          <Button className="Form__buttons__item Form__buttons__item__blue">
            Submit
          </Button>
          <Link to="/login" className="Form__buttons__item Form__buttons__item__gray">Cancel</Link>
        </div>
      </Form>
    );
  }
}

export default connect()(PasswordRequestForm);
