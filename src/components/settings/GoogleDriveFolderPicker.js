// @flow
import React from 'react';
import GooglePicker from 'react-google-picker';
import Button from '../utility/buttons/Button';
import type { Team } from '../../models/Team';
import DriveService from '../../services/DriveService';

type Props = {
    team: Team,
    reloadTeam: Function,
  };

function GoogleDriveFolderPicker(props: Props) {
  return (
    <GooglePicker
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      developerKey={process.env.REACT_APP_DEVELOPER_KEY}
      scope={['https://www.googleapis.com/auth/drive']}
      onChange={data => console.log('on change:', data)}
      onAuthFailed={data => console.log('on auth failed:', data)}
      multiselect
      navHidden
      authImmediate={false}
      viewId="FOLDERS"
      createPicker={(google, oauthToken) => {
        const googleViewId = google.picker.ViewId.FOLDERS;
        const docsView = new google.picker.DocsView(googleViewId)
          .setIncludeFolders(true)
          .setMimeTypes('application/vnd.google-apps.folder')
          .setSelectFolderEnabled(true);

        const pickerCallback = async (data) => {
          let url = 'nothing';
          console.log(data);
          if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
            const doc = data[google.picker.Response.DOCUMENTS][0];
            console.log(doc);
            url = doc[google.picker.Document.URL];
            await DriveService.create(props.team.id, { driveId: doc.id, name: doc.name, url: doc.url });
            props.reloadTeam();
          }
          const message = `You picked: ${url}`;
          console.log(`set folder: ${url} for team ${props.team.name}`);
          console.log(message);
        };


        const picker = new window.google.picker.PickerBuilder()
          .addView(docsView)
          .setOAuthToken(oauthToken)
          .setDeveloperKey(process.env.REACT_APP_DEVELOPER_KEY)
          .setCallback(pickerCallback);

        picker.build().setVisible(true);
      }}
    >
      <Button
        data-cy="team-settings-googledrive-connect-button"
      >
        Connect with Google Drive Folder
      </Button>
      <div className="google" />
    </GooglePicker>
  );
}

export default GoogleDriveFolderPicker;
