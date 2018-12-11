// @flow
import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import FlashMessages from './utility/flash/FlashMessages';
import ImagesIndex from './images/ImagesIndex';
import FileUpload from './upload/FileUpload';
import Tagging from './tagging/Tagging';
import NavBar from './navbar/NavBar';
import Presentation from './presentation/Presentation';
import './App.scss';

function App() {
  return (
    <div className="App">
      <FlashMessages />
      <NavBar />
      <div className="App__inner">
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

export default App;
