// @flow
/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component, Fragment } from 'react';
import ReactTooltip from 'react-tooltip';
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
    if (this.props.isPresentationModeOn) {
      dispatch(turnOffPresentationMode());
    } else {
      dispatch(turnOnPresentationMode());
    }
  };

  render() {
    const { isPresentationModeOn } = this.props;
    const className = classNames('PresentationSwitch', { 'PresentationSwitch--active': isPresentationModeOn });

    return (
      <Fragment>
        <button
          type="button"
          data-tip="Synchronized Presentation Mode"
          className={className}
          onClick={this.handleClick}
        >
          <div className="PresentationSwitch__outer">
            <div className="PresentationSwitch__inner" />
          </div>
        </button>
        <ReactTooltip place="bottom" effect="solid" />
      </Fragment>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isPresentationModeOn: state.presentationMode.isActive,
});

export default connect(mapStateToProps)(PresentationSwitch);
