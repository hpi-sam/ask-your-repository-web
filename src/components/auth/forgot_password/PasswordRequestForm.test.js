// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import Form from 'react-validation/build/form';
import ValidationErrors from '../../utility/form/ValidationErrors';
import PasswordRequestForm from './PasswordRequestForm';
import initialState from '../../../state/initialState';
import AuthService from '../../../services/AuthService';

const mockStore = configureMockStore();

jest.mock('../../../services/AuthService');


describe('<PasswordRequestForm />', () => {
  let wrapper;
  let store;

  beforeAll(() => {
    AuthService.requestResetLink.mockImplementation(() => Promise.resolve([]));
  });

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount((
      <Provider store={store}>
        <MemoryRouter>
          <PasswordRequestForm />
        </MemoryRouter>
      </Provider>
    )).find('PasswordRequestForm');
  });

  afterEach(() => {
    AuthService.requestResetLink.mockClear();
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('shows a validation Error when submitting without providing an email', () => {
    wrapper.find(Form).simulate('submit');
    wrapper = wrapper.update();
    expect(wrapper.find(ValidationErrors).text()).toEqual('Please fill in all fields.');
  });

  it('calls the auth service with the provided email', () => {
    const testEmail = 'test@example.com';
    wrapper.find('input').simulate('change', { target: { name: 'email', value: testEmail } });
    wrapper.find(Form).simulate('submit');
    expect(AuthService.requestResetLink).toHaveBeenCalledWith(testEmail);
  });
});
