// @flow
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DeleteButton from '../utility/buttons/DeleteButton';
import ConfirmModal from '../utility/ConfirmModal';
import GoogleDriveFolderPicker from './GoogleDriveFolderPicker';
import type { Team } from '../../models/Team';
import DriveService from '../../services/DriveService';
import './Settings.scss';
import type { User } from '../../models/User';
import type { AppState } from '../../state/AppState';

type Props = {
  team: Team,
  reloadTeam: Function,
  user: User,
};

type State = {
  showModal: boolean,
};

class GoogleDriveSyncSettings extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  hasGoogleDriveAccess = () => {
    const { google } = this.props.user;
    if (google) {
      return google.hasOfflineAccess;
    }
    return false;
  };

  isOwner = () => this.props.team.drive && this.props.team.drive.owner.id === this.props.user.id;

  handleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  revokeAccess = async () => {
    if (!this.props.team.drive) return;
    await DriveService.delete(this.props.team.id, this.props.team.drive.id);
    this.setState({ showModal: false });
    this.props.reloadTeam();
  };


  render() {
    const { team } = this.props;
    const { showModal } = this.state;
    let connectionInformation;
    if (team.drive) {
      connectionInformation = (
        <Fragment>
          <div className="Settings__item__text">
            {' '}
            Your team is currently connected to:
            {' '}
            <a className="Settings__item__link" href={team.drive.url}>
              {team.drive.name}
            </a>
          </div>
          {this.isOwner() && (
          <DeleteButton
            onClick={this.handleModal}
            data-cy="team-settings-googledrive-revoke-access"
          >
            Revoke Access
            {' '}
          </DeleteButton>
          )}
        </Fragment>
      );
    } else if (this.hasGoogleDriveAccess()) {
      connectionInformation = (
        <Fragment>
          <div className="Settings__item__text"> Connect your team to a Google Drive folder to automatically sync your images. </div>
          <GoogleDriveFolderPicker reloadTeam={this.props.reloadTeam} team={team} />
        </Fragment>
      );
    } else {
      connectionInformation = (
        <Fragment>
          <div className="Settings__item__text">
          You have to connect a google account first and give us drive access.
            {' '}
            <br />
          You can do this on your
            <Link className="Settings__item__link" to="/settings"> Settings page!</Link>
          </div>
        </Fragment>
      );
    }
    return (
      <Fragment>
        {showModal && (
          <ConfirmModal
            onCancel={this.handleModal}
            onContinue={this.revokeAccess}
          >
            <div> Are you sure you want to revoke the access? </div>
            <div>
              Your images will not be synced between your
              team and your Google Drive anymore.
            </div>
          </ConfirmModal>
        )}
        {connectionInformation}
      </Fragment>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(GoogleDriveSyncSettings);
