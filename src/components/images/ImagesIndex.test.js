// @flow
import React from 'react';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ImagesIndex from './ImagesIndex';
import api from '../../config/api';
import emptyState from '../../state/emptyState';
import ImageFactory from '../../factories/ImageFactory';

const mockStore = configureStore([thunk]);

jest.mock('../../config/api');

describe('<ImagesIndex />', () => {
  let store;
  let wrapper;

  beforeAll(() => {
    api.get.mockImplementation(() => Promise.resolve({ data: { images: [] } }));
  });

  beforeEach(() => {
    store = mockStore(emptyState);
    wrapper = shallow(<ImagesIndex store={store} />).dive();
  });

  afterEach(() => {
    api.get.mockClear();
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('server responding with a non empty array', () => {
    beforeAll(() => {
      const images = [ImageFactory.createDummyImage()];
      api.get.mockImplementation(() => Promise.resolve({ data: { images } }));
    });

    it('should increase the offset by the limit', async () => {
      expect(wrapper.state().offset).toEqual(10);
    });
  });

  it('should not send a request when end is reached', async () => {
    const calls = api.get.mock.calls.length;
    wrapper.setState({ endReached: true });
    await wrapper.instance().loadMoreImages();
    expect(api.get).toHaveBeenCalledTimes(calls);
  });

  describe('server responding with empty array', () => {
    beforeAll(() => {
      api.get.mockImplementation(() => Promise.resolve({ data: { images: [] } }));
    });

    it('should set state to end reached', async () => {
      expect(wrapper.state().endReached).toEqual(true);
    });
  });
});
