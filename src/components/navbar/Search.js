// @flow
/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { MdSearch } from 'react-icons/md';
import ImageService from '../../services/ImageService';
import { startPresentation } from '../../state/presentation/presentation.actionCreators';
import './Search.scss';

type Props = {
  dispatch: Function,
};

type State = {
  search: string,
  isSelected: boolean,
};

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isSelected: false,
      search: '',
    };
  }

  handleSelect = () => {
    this.setState({ isSelected: true });
  };

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ search: value });
  };

  handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { search } = this.state;
    const images = await ImageService.list({ search });

    this.props.dispatch(startPresentation(images.slice(0, 4)));
  };

  render() {
    const { isSelected, search } = this.state;

    return (
      <form className="Search" onSubmit={this.handleSubmit}>
        {isSelected ? (
          <Fragment>
            <MdSearch className="Search__input__icon" />
            <input
              autoFocus
              type="text"
              value={search}
              className="Search__input"
              onChange={this.handleChange}
            />
          </Fragment>
        ) : (
          <button
            type="button"
            onClick={this.handleSelect}
            className="Search__preview"
          >
            <MdSearch className="Search__preview__icon" />
            Suchen
          </button>
        )}
      </form>
    );
  }
}

export default connect()(Search);
