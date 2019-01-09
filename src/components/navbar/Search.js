// @flow
/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component, Fragment } from 'react';
import onClickOutside from 'react-onclickoutside';
import { connect } from 'react-redux';
import { MdSearch, MdClose } from 'react-icons/md';
import classNames from 'classnames';
import ImageService from '../../services/ImageService';
import { startPresentation } from '../../state/presentation/presentation.actionCreators';
import type { AppState } from '../../state/AppState';
import type { Team } from '../../models/Team';
import './Search.scss';

type Props = {
  dispatch: Function,
  activeTeam: ?Team,
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
    this.setState({ isSelected: false });
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
    const images = await ImageService.list({
      teamId: activeTeam.id,
      search,
    });

    const filteredImages = images
      .filter(image => image.score > 0)
      .slice(0, 4);

    this.props.dispatch(startPresentation(filteredImages));
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
});

export default connect(mapStateToProps)(onClickOutside(Search));
