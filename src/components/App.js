// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import classNames from 'classnames';
import FlashMessages from './utility/flash/FlashMessages';
import ImagesIndex from './images/ImagesIndex';
import FileUpload from './upload/FileUpload';
import Tagging from './tagging/Tagging';
import NavBar from './navbar/NavBar';
import Presentation from './presentation/Presentation';
import TeamSidebar from './team_sidebar/TeamSidebar';
import type { AppState } from '../state/AppState';
import './App.scss';

type Props = {
  isTeamSidebarOpen: boolean,
};

function App(props: Props) {
  return (
    <div className="App">
      <FlashMessages />
      <TeamSidebar />
      <NavBar />
      <div className={classNames('App__inner', { 'App__inner--with-sidebar': props.isTeamSidebarOpen })}>
        <Switch>
          <Redirect exact from="/" to="/images" />
          <Route path="/upload" component={FileUpload} />
          <Route path="/tagging" component={Tagging} />
          <Route path="/images" component={ImagesIndex} />
          <Route path="/presentation" component={Presentation} />
        </Switch>
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  isTeamSidebarOpen: state.teamSidebar.isOpen,
});

export default connect(mapStateToProps)(App);
