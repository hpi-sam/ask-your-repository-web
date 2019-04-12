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
    const password = 'test';
    wrapper.setState({ password, passwordConfirm: 'missmatched_password' });
    wrapper.find(Form).simulate('submit');
    wrapper = wrapper.update();
    expect(wrapper.find(ValidationErrors).text()).toEqual('Passwords do not match.');
  });

  it('calls the auth service with the password', () => {
    const password = 'test';
    wrapper.setState({ password, passwordConfirm: password });
    wrapper.find(Form).simulate('submit');
    expect(UserService.changePassword).toHaveBeenCalledWith(password, 'test_token');
  });

  it('updates the state when the user types in the password field', () => {
    const password = 'test';
    wrapper.find('input[name="password"]').simulate('change', { target: { name: 'password', value: password } });
    expect(wrapper.state().password).toEqual(password);
  });
});
