// @flow
import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import './App.scss';
import ImagesIndex from './images/ImagesIndex';
import FileUpload from './upload/FileUpload';
import Tagging from './tagging/Tagging';

function App() {
  return (
    <div className="App">
      <Switch>
        <Redirect exact from="/" to="/upload" />
        <Route path="/upload" component={FileUpload} />
        <Route path="/tagging" component={Tagging} />
        <Route path="/images" component={ImagesIndex} />
      </Switch>
    </div>
  );
}

export default App;
