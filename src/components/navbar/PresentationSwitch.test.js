// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import initialState from '../../state/initialState';
import PresentationSwitch from './PresentationSwitch';
import { turnOnPresentationMode, turnOffPresentationMode } from '../../state/presentation_mode/presentationMode.actionCreators';

const mockStore = configureStore();

describe('<PresentationSwitch />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(() => initialState);
    wrapper = mount((
      <Provider store={store}>
        <PresentationSwitch />
      </Provider>
    )).find('PresentationSwitch');
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('presentation mode is off', () => {
    beforeAll(() => {
      initialState.presentationMode.isActive = false;
    });

    it('turns on presentation mode on click', () => {
      wrapper.find('button').simulate('click');
      expect(store.getActions()).toEqual([turnOnPresentationMode()]);
    });
  });

  describe('presentation mode is on', () => {
    beforeAll(() => {
      initialState.presentationMode.isActive = true;
    });

    it('turns off presentation mode on click', () => {
      wrapper.find('button').simulate('click');
      expect(store.getActions()).toEqual([turnOffPresentationMode()]);
    });
  });
});
