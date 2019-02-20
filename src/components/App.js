// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import classNames from 'classnames';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import FlashMessages from './utility/flash/FlashMessages';
import ImagesIndex from './images/ImagesIndex';
import Upload from './upload/Upload';
import NavBar from './navbar/NavBar';
import Presentation from './presentation/Presentation';
import TeamSidebar from './team_sidebar/TeamSidebar';
import type { AppState } from '../state/AppState';
import ImageDetails from './images/ImageDetails';
import ImageEdit from './images/ImageEdit';
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
          <Route path="/upload" component={Upload} />
          <Route path="/images/:id/edit" component={ImageEdit} />
          <Route path="/images/:id" component={ImageDetails} />
          <Route path="/images" component={ImagesIndex} />
          <Route path="/presentation" component={Presentation} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
        </Switch>
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  isTeamSidebarOpen: state.teamSidebar.isOpen,
});

export default connect(mapStateToProps)(App);
