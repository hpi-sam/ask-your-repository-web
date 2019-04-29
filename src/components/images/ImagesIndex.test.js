// @flow
import React from 'react';
import { render } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ImagesIndex from './ImagesIndex';
import TeamFactory from '../../factories/TeamFactory';
import initialState from '../../state/initialState';

const mockStore = configureMockStore();

jest.mock('../../services/ImageService', () => ({
  list: jest.fn(() => Promise.resolve([])),
}));

function renderWithStoreAndRouter(search = '') {
  const location = { search };

  const store = mockStore({
    ...initialState,
    activeTeam: TeamFactory.createStaticDummyTeam(),
  });

  return render((
    <Provider store={store}>
      <MemoryRouter>
        <ImagesIndex location={location} />
      </MemoryRouter>
    </Provider>
  ));
}

describe('<ImagesIndex />', () => {
  it('should display a list empty message when there are no images', () => {
    const { getByText } = renderWithStoreAndRouter();

    expect(getByText('loading')).toBeTruthy;
  });

  it('should display a search empty message when the search result is empty', () => {

  });
});
