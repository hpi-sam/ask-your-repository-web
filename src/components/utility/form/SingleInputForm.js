// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { MdCheck, MdClose } from 'react-icons/md';
import SaveButton from '../SaveButton';
import CloseButton from '../CloseButton';
import './SingleInputForm.scss';

type Props = {
  onSubmit: (text: string) => any,
  onClose: () => void,
  className?: string,
  placeholder?: string,
};

type State = {
  text: string,
};

class SingleInputForm extends Component<Props, State> {
  static defaultProps = {
    className: '',
    placeholder: '',
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      text: '',
    };
  }

  handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
  };

  handleInputChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ text: e.target.value });
  };

  render() {
    const className = classNames('SingleInputForm', this.props.className);

    return (
      <form className={className} onSubmit={this.handleSubmit}>
        <div className="SingleInputForm__inner">
          <input
            className="SingleInputForm__input"
            value={this.state.text}
            type="text"
            onChange={this.handleInputChange}
            placeholder={this.props.placeholder}
          />
          <SaveButton
            type="submit"
            className="SingleInputForm__button"
          >
            <MdCheck />
          </SaveButton>
          <CloseButton
            onClick={this.props.onClose}
            type="button"
            className="SingleInputForm__button"
          >
            <MdClose />
          </CloseButton>
        </div>
      </form>
    );
  }
}

export default SingleInputForm;
