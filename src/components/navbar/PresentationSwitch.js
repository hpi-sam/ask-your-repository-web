// @flow
/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { turnOnPresentationMode, turnOffPresentationMode } from '../../state/presentation_mode/presentationMode.actionCreators';
import type { AppState } from '../../state/AppState';
import './PresentationSwitch.scss';

type Props = {
  dispatch: Function,
  isPresentationModeOn: boolean,
};

class PresentationSwitch extends Component<Props> {
  handleClick = () => {
    const { dispatch } = this.props;
    if (!this.props.isPresentationModeOn) {
      dispatch(turnOnPresentationMode());
    } else {
      dispatch(turnOffPresentationMode());
    }
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
  isPresentationModeOn: state.presentationMode.isActive,
});

export default connect(mapStateToProps)(PresentationSwitch);
