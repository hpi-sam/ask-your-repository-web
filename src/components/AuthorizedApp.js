// @flow
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import classNames from 'classnames';
import ImagesIndex from './images/ImagesIndex';
import Upload from './upload/Upload';
import NavBar from './navbar/NavBar';
import Settings from './settings/Settings';
import Presentation from './presentation/Presentation';
import TeamSidebar from './team_sidebar/TeamSidebar';
import type { AppState } from '../state/AppState';
import ImageDetails from './images/ImageDetails';
import ImageEdit from './images/ImageEdit';
import TeamRoute from './custom_routes/TeamRoute';
import TeamSelect from './team_select/TeamSelect';
import Footer from './footer/Footer';
import UploadActionButton from './upload/UploadActionButton';
import './App.scss';

type Props = {
  isTeamSidebarOpen: boolean,
};

function AuthorizedApp(props: Props) {
  return (
    <Fragment>
      <TeamSidebar />
      <NavBar />
      <div className={classNames('App__inner', { 'App__inner--with-sidebar': props.isTeamSidebarOpen })}>
        <Switch>
          <Redirect exact from="/" to="/images" />
          <Route path="/select-team" component={TeamSelect} />
          <Route path="/settings" component={Settings} />
          <TeamRoute path="/upload" component={Upload} />
          <TeamRoute path="/images/:id/edit" component={ImageEdit} />
          <TeamRoute path="/images/:id" component={ImageDetails} />
          <TeamRoute path="/images" component={ImagesIndex} />
          <TeamRoute path="/presentation" component={Presentation} />
        </Switch>
        <TeamRoute exact path="/images" component={UploadActionButton} />
      </div>
      <Footer />
    </Fragment>
  );
}

const mapStateToProps = (state: AppState) => ({
  isTeamSidebarOpen: state.teamSidebar.isOpen,
});

export default connect(mapStateToProps)(AuthorizedApp);
