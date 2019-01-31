// @flow
/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component, Fragment } from 'react';
import { push } from 'connected-react-router';
import qs from 'qs';
import onClickOutside from 'react-onclickoutside';
import { connect } from 'react-redux';
import { MdSearch, MdClose } from 'react-icons/md';
import classNames from 'classnames';
import { synchronizedSearch } from '../../state/presentation/presentation.actionCreators';
import type { AppState } from '../../state/AppState';
import type { Team } from '../../models/Team';
import './Search.scss';

type Props = {
  dispatch: Function,
  activeTeam: ?Team,
  isPresentationModeOn: boolean,
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

  handleClickOutside = () => {
    this.setState({ isSelected: false });
  };

  handleSelect = () => {
    this.setState({ isSelected: true });
  };

  handleClose = () => {
    this.setState({ isSelected: false, search: '' });
  };

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ search: value });
  };

  handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { activeTeam } = this.props;
    if (!activeTeam) return;

    const { search } = this.state;

    if (this.props.isPresentationModeOn) {
      this.props.dispatch(synchronizedSearch(search));
    } else {
      this.props.dispatch(push(`/images?${qs.stringify({ search })}`));
    }
  };

  render() {
    const { isSelected, search } = this.state;
    const className = classNames('Search', {
      'Search--active': isSelected,
    });

    return (
      <form className={className} onSubmit={this.handleSubmit}>
        {isSelected ? (
          <Fragment>
            <MdSearch className="Search__input__icon Search__input__icon--left" />
            <input
              autoFocus
              type="text"
              value={search}
              className="Search__input"
              onChange={this.handleChange}
            />
            <button
              type="button"
              onClick={this.handleClose}
              className="Search__input__close"
            >
              <MdClose />
            </button>
          </Fragment>
        ) : (
          <button
            type="button"
            onClick={this.handleSelect}
            className="Search__preview"
          >
            <MdSearch className="Search__preview__icon" />
            <span className="Search__preview__text">
              Suchen
            </span>
          </button>
        )}
      </form>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  activeTeam: state.activeTeam,
  isPresentationModeOn: state.presentationMode.isActive,
});

export default connect(mapStateToProps)(onClickOutside(Search));
