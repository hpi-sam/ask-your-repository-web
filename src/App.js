// @flow
import React from 'react';
import { connect } from 'react-redux';
import FileUpload from './upload/FileUpload';
import Tagging from './tagging/Tagging';
import type { Image } from './models/Image';
import type { AppState } from './state/AppState';
import './App.scss';

type Props = {
  hasUploadedImage: Image,
};

function App(props: Props) {
  return (
    <div className="App">
      {props.hasUploadedImage
        ? <Tagging />
        : <FileUpload />}
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  hasUploadedImage: !!state.image,
});

export default connect(mapStateToProps)(App);
