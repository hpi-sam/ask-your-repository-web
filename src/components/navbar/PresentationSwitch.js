// @flow
/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import { connect } from 'react-redux';
import { turnOnPresentationMode, turnOffPresentationMode } from '../../state/presentation_mode/presentationMode.actionCreators';
import type { AppState } from '../../state/AppState';
import type { Team } from '../../models/Team';
import './PresentationSwitch.scss';

type Props = {
  dispatch: Function,
  activeTeam: ?Team,
  isPresentationModeOn: boolean,
};

class PresentationSwitch extends Component<Props, State> {
  handleClick = () => {
    const { dispatch } = this.props;
    if (!this.props.isPresentationModeOn) {
      dispatch(turnOnPresentationMode());
    } else {
      dispatch(turnOffPresentationMode());
    }

    // this.setState(previousState => ({ isChecked: !previousState.isChecked }));
  }


  render() {
    const { isPresentationModeOn } = this.props;
    const className = classNames('PresentationSwitch', { 'PresentationSwitch--active': isPresentationModeOn });
    const outerClassName = classNames('PresentationSwitch__outer', { 'PresentationSwitch__outer--active': isPresentationModeOn });
    const innerClassName = classNames('PresentationSwitch__inner', { 'PresentationSwitch__inner--active': isPresentationModeOn });

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
  isPresentationModeOn: state.presentationMode.isActive,
});

export default connect(mapStateToProps)(onClickOutside(PresentationSwitch));
