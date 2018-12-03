// @flow
import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import './App.scss';
import FlashMessage from './utility/FlashMessage';
import ImagesIndex from './images/ImagesIndex';
import FileUpload from './upload/FileUpload';
import Tagging from './tagging/Tagging';
import { getLatestMessage, flashMessageType } from 'redux-flash';

type Props = {
  dispatch: Function,
  flash: flashMessageType,
};


function App(props: Props) {
  return (
    <div className="App">
      {props.flash &&
        <FlashMessage>
          {props.flash.message}
        </FlashMessage>
      };
      <Switch>
        <Redirect exact from="/" to="/upload" />
        <Route path="/upload" component={FileUpload} />
        <Route path="/tagging" component={Tagging} />
        <Route path="/images" component={ImagesIndex} />
      </Switch>
    </div>
  );
}

function mapStateToProps (state) {
    return {
        flash: getLatestMessage(state)
    }
}

export default connect(mapStateToProps)(App);
