// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { flashMessage } from 'redux-flash';
import TaggingForm from './TaggingForm';
import TaggingImagePreview from './TaggingImagePreview';
import type { Image } from '../../models/Image';
import type { AppState } from '../../state/AppState';
import './Tagging.scss';

type Props = {
  image: Image,
  dispatch: flashMessage,
};

type State = {
  redirect: boolean,
}

class Tagging extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: false,
    };
  }

  redirectCallback = () => {
    this.setState({
      redirect: true,
    });
    const action = flashMessage('Your image was sucessfully uploaded.');
    this.props.dispatch(action);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/upload' />;
    }

    if (!this.props.image) return null;

    return (
      <div className="Tagging">
        <div className="Tagging__inner">
          <TaggingForm redirectCallback={this.redirectCallback}/>
          <TaggingImagePreview image={this.props.image} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  image: state.image,
});

export default connect(mapStateToProps)(Tagging);
