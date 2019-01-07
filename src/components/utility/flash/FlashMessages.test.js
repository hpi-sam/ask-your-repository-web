// @flow
import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import initialState from '../../../state/initialState';
import FlashMessageFactory from '../../../factories/FlashMessageFactory';
import FlashSuccessMessage from './FlashSuccessMessage';
import FlashErrorMessage from './FlashErrorMessage';
import FlashMessages from './FlashMessages';

const mockStore = configureStore();

describe('<FlashMessages />', () => {
  let wrapper;
  let store;
  let state;
  let flashMessages = [];

  beforeEach(() => {
    state = {
      ...initialState,
      flash: { messages: flashMessages },
    };
    store = mockStore(() => state);
    wrapper = mount((
      <Provider store={store}>
        <FlashMessages />
      </Provider>
    ));
  });

  it('renders nothing on empty queue', () => {
    expect(wrapper.find(FlashMessages).html()).toEqual(null);
  });

  describe('latest message is error message', () => {
    beforeAll(() => {
      flashMessages = [FlashMessageFactory.createDummyErrorMessage()];
    });

    it('renders a FlashErrorMessage component', () => {
      expect(wrapper.find(FlashErrorMessage).exists()).toEqual(true);
    });
  });

  describe('latest message is success message', () => {
    beforeAll(() => {
      flashMessages = [FlashMessageFactory.createDummySuccessMessage()];
    });

    it('renders a FlashSuccessMessage component', () => {
      expect(wrapper.find(FlashSuccessMessage).exists()).toEqual(true);
    });
  });
});
