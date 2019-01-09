// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import ImagesIndex, { limit } from './ImagesIndex';
import ImageService from '../../services/ImageService';
import ImageFactory from '../../factories/ImageFactory';
import TeamFactory from '../../factories/TeamFactory';
import initialState from '../../state/initialState';

const mockStore = configureMockStore();

jest.mock('../../services/ImageService');

describe('<ImagesIndex />', () => {
  let wrapper;
  let store;

  const state = {
    ...initialState,
    activeTeam: TeamFactory.createDummyTeam(),
  };

  beforeAll(() => {
    ImageService.list.mockImplementation(() => Promise.resolve([]));
  });

  beforeEach(() => {
    store = mockStore(state);
    wrapper = shallow(<ImagesIndex store={store} />).dive();
  });

  afterEach(() => {
    ImageService.list.mockClear();
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('server responding with a non empty array', () => {
    beforeAll(() => {
      const images = [ImageFactory.createDummyImage()];
      ImageService.list.mockImplementation(() => Promise.resolve(images));
    });

    it('should increase the offset by the limit', async () => {
      expect(wrapper.state().offset).toEqual(limit);
    });
  });

  it('should not call image service when end is reached', async () => {
    const calls = ImageService.list.mock.calls.length;
    wrapper.setState({ endReached: true });
    await wrapper.instance().loadMoreImages();
    expect(ImageService.list).toHaveBeenCalledTimes(calls);
  });

  describe('server responding with empty array', () => {
    beforeAll(() => {
      ImageService.list.mockImplementation(() => Promise.resolve([]));
    });

    it('should set state to end reached', async () => {
      expect(wrapper.state().endReached).toEqual(true);
    });
  });
});
