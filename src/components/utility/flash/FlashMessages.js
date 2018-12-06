// @flow
import React from 'react';
import { connect } from 'react-redux';
import { getLatestMessage } from 'redux-flash';
import type { flashMessageType } from 'redux-flash';
import FlashSuccessMessage from './FlashSuccessMessage';
import FlashErrorMessage from './FlashErrorMessage';
import type { AppState } from '../../../state/AppState';

type Props = {
  flash: flashMessageType,
};

function FlashMessages(props: Props) {
  const { flash } = props;

  if (!flash) return null;

  if (flash.isError) {
    return <FlashErrorMessage>{flash.message}</FlashErrorMessage>;
  }

  return (
    <FlashSuccessMessage>
      {props.flash.message}
    </FlashSuccessMessage>
  );
}

const mapStateToProps = (state: AppState) => ({
  flash: getLatestMessage(state),
});

export default connect(mapStateToProps)(FlashMessages);
