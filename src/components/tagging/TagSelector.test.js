// @flow
import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import TagSelector from './TagSelector';
import ImageFactory from '../../factories/ImageFactory';
import initialState from '../../state/initialState';
import type { AppState } from '../../state/AppState';
import * as actionTypes from '../../state/image/image.actionTypes';

const mockStore = configureStore();

describe('<TagSelector />', () => {
  const image = ImageFactory.createDummyImage();

  let state: AppState;
  let store;
  let wrapper;
  let input;

  beforeEach(() => {
    state = { ...initialState, image };
    store = mockStore(() => state);
    wrapper = shallow(<TagSelector store={store} />).dive();
    input = wrapper.find('input');
  });

  it('should render when mounted', () => {
    const mountWrapper = mount((
      <Provider store={store}>
        <TagSelector tags={image.tags} />
      </Provider>
    ));
    expect(mountWrapper.exists()).toBeTruthy();
  });

  it('should not render when no image is set', () => {
    state = { ...state, image: null };
    wrapper = shallow(<TagSelector store={store} />).dive();
    expect(wrapper.html()).toEqual(null);
  });

  it('should dispatch nothing on any key but enter, komma or return', () => {
    _.range(65, 90).forEach((keyCode) => {
      input.simulate('keyDown', { keyCode });
    });
    expect(store.getActions()).toHaveLength(0);
  });

  describe('input is empty', () => {
    it('should dispatch nothing on enter press', () => {
      input.simulate('keyDown', { keyCode: 13 });
      expect(store.getActions()).toHaveLength(0);
    });

    it('should dispatch nothing on komma press', () => {
      input.simulate('keyDown', { keyCode: 188, preventDefault: () => {} });
      expect(store.getActions()).toHaveLength(0);
    });

    it('should dispatch an REMOVE_LAST_TAG action when hitting return', () => {
      input.simulate('keyDown', { keyCode: 8 });
      const action = store.getActions()[0];
      expect(action.type).toEqual(actionTypes.REMOVE_LAST_TAG);
    });
  });

  describe('input is not empty', () => {
    const tag = 'Example';
    let action;

    beforeEach(() => {
      input.simulate('change', { target: { value: tag } });
    });

    it('should not dispatch any action when hitting return', () => {
      input.simulate('keyDown', { keyCode: 8 });
      expect(store.getActions()).toHaveLength(0);
    });

    describe('hitting komma', () => {
      const event = {
        keyCode: 188,
        preventDefault: jest.fn(),
      };

      beforeEach(() => {
        input.simulate('keyDown', event);
        [action] = store.getActions();
      });

      it('should prevent the default event', () => {
        expect(event.preventDefault).toHaveBeenCalled();
      });

      it('should dispatch an ADD_TAG action', () => {
        expect(action.type).toEqual(actionTypes.ADD_TAG);
      });

      it('should dispatch the submitted tag', () => {
        expect(action.tag).toEqual(tag);
      });
    });

    describe('hitting enter', () => {
      beforeEach(() => {
        input.simulate('keyDown', { keyCode: 13 });
        [action] = store.getActions();
      });

      it('should dispatch an ADD_TAG action', () => {
        expect(action.type).toEqual(actionTypes.ADD_TAG);
      });

      it('should dispatch the submitted tag', () => {
        expect(action.tag).toEqual(tag);
      });
    });
  });

  it('should display a typing hint if there are no tags on the input is empty', () => {
    image.tags = [];
    wrapper.setProps({ image });
    expect(wrapper.text()).toEqual(expect.stringContaining('Start typing'));
  });

  it('should display a enter hint if there are no tags on the input is not empty', () => {
    image.tags = [];
    wrapper.setProps({ image });
    input.simulate('change', { target: { value: 'abc' } });
    expect(wrapper.text()).toEqual(expect.stringContaining('Hit ⏎'));
  });

  it('should display a return hint if there is exactly one tag', () => {
    image.tags = ['Example'];
    wrapper.setProps({ image });
    expect(wrapper.text()).toEqual(expect.stringContaining('Remove with ⌫'));
  });
});
