// @flow

export type GoogleOAuth = {
  userId: string,
  hasOfflineAccess: boolean,
};

export type User = {
  id: string,
  email: string,
  username: string,
  hasPassword: boolean,
  google?: GoogleOAuth,
};

export type UserCreateParams = {
  email: string,
  username: string,
  password: string,
};

type PasswordUpdateParams = {
  password: string,
  oldPassword: string,
};

type GoogleUpdateParams = {
  idToken: string,
};

export type UserUpdateParams = PasswordUpdateParams | GoogleUpdateParams;
