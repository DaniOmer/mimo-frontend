export enum AuthType {
  Basic = "basic",
  Social = "social",
}

export interface IRole {
  _id: string;
  name: string;
  permissions: IPermission[];
}

export interface IPermission {
  _id: string;
  name: string;
}

export interface IUserCreate {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  isTermsOfSale: boolean;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  roles: IRole[];
  permissions: IPermission[];
  isTermsOfSale: boolean;
  isVerified: boolean;
  isDisabled: boolean;
  authType: AuthType;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IEmailVerify {
  token: string;
}

export interface IPasswordChange {
  oldPassword: string;
  newPassword: string;
}
