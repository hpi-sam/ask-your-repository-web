// @flow
/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import { connect } from 'react-redux';
import { startPresentation } from '../../state/presentation/presentation.actionCreators';
import type { AppState } from '../../state/AppState';
import type { Team } from '../../models/Team';
import './PresentationSwitch.scss';

type Props = {
  dispatch: Function,
  activeTeam: ?Team,
};

type State = {
  isChecked: boolean,
};

class PresentationSwitch extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isChecked: false,
    };
  }

  handleClick = () => {
    this.setState(previousState => ({ isChecked: !previousState.isChecked }));
  }


  render() {
    const { isChecked } = this.state;
    const className = classNames('PresentationSwitch', { 'PresentationSwitch--active': isChecked });
    const outerClassName = classNames('PresentationSwitch__outer', { 'PresentationSwitch__outer--active': isChecked });
    const innerClassName = classNames('PresentationSwitch__inner', { 'PresentationSwitch__inner--active': isChecked });

    return (
      <button type="button" data-tip="Turn on Presentation Mode" className={className} onClick={this.handleClick}>
        <div className={outerClassName}>
          <div className={innerClassName} />
        </div>
      </button>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  activeTeam: state.activeTeam,
});

export default connect(mapStateToProps)(onClickOutside(PresentationSwitch));
