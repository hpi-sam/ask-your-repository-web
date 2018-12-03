// @flow
import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './App';
import emptyState from '../state/emptyState';
import type { AppState } from '../state/AppState';

const mockStore = configureStore();

describe('<App />', () => {
  let store;
  let wrapper;
  let state: AppState;

  beforeEach(() => {
    state = emptyState;
    store = mockStore(() => state);
    wrapper = shallow(<App store={store} />).dive();
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
