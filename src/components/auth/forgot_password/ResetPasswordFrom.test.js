// @flow
import React from 'react';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import Form from 'react-validation/build/form';
import ResetPasswordForm from './ResetPasswordForm';
import initialState from '../../../state/initialState';
import ValidationErrors from '../../utility/form/ValidationErrors';
import UserService from '../../../services/UserService';

const mockStore = configureMockStore();

jest.mock('../../../services/UserService');

describe('<ResetPasswordForm />', () => {
  let wrapper;
  let store;

  beforeAll(() => {
    UserService.changePassword.mockImplementation(() => Promise.resolve([]));
  });

  beforeEach(() => {
    store = mockStore(initialState);
    const location = { search: '?reset_token=test_token' };
    wrapper = mount((
      <Provider store={store}>
        <MemoryRouter>
          <ResetPasswordForm location={location} />
        </MemoryRouter>
      </Provider>
    )).find('ResetPasswordForm');
  });

  afterEach(() => {
    UserService.changePassword.mockClear();
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('shows a validation Error when submitting without providing a password', () => {
    wrapper.find(Form).simulate('submit');
    wrapper = wrapper.update();
    expect(wrapper.find(ValidationErrors).text()).toEqual('Please fill in all fields.');
  });

  it('shows a validation Error when submitting with mismatching passwords', () => {
    wrapper.find('input[name="password"]')
      .simulate('change', { target: { name: 'password', value: 'test' } });
    wrapper.find('input[name="passwordConfirm"]')
      .simulate('change', { target: { name: 'password', value: 'mismatched_password' } });
    wrapper.find(Form).simulate('submit');
    wrapper = wrapper.update();
    expect(wrapper.find(ValidationErrors).text()).toEqual('Passwords do not match.');
  });

  it('calls the auth service with the password', () => {
    wrapper.find('input[name="password"]')
      .simulate('change', { target: { name: 'password', value: 'test' } });
    wrapper.find('input[name="passwordConfirm"]')
      .simulate('change', { target: { name: 'password', value: 'test' } });
    wrapper.find(Form).simulate('submit');
    expect(UserService.changePassword).toHaveBeenCalledWith('test', 'test_token');
  });
});
