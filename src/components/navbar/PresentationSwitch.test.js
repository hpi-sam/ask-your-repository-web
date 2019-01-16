// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import initialState from '../../state/initialState';
import PresentationSwitch from './PresentationSwitch';
import { turnOnPresentationMode, turnOffPresentationMode } from '../../state/presentation_mode/presentationMode.actionCreators';

const mockStore = configureStore();

describe('<PresentationSwitch />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow((
      <PresentationSwitch store={store} />
    )).dive();
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('turns on PresentationMode on click', () => {
    wrapper.find('button').simulate('click');
    expect(store.getActions()).toEqual([turnOnPresentationMode()]);
  });

  it('turns off presentation mode if it was on before', () => {
    const storeState = initialState;
    storeState.presentationMode.isActive = true;
    store = mockStore(storeState);
    wrapper = shallow((
      <PresentationSwitch store={store} />
    )).dive();
    wrapper.find('button').simulate('click');
    expect(store.getActions()).toEqual([turnOffPresentationMode()]);
  });
});
