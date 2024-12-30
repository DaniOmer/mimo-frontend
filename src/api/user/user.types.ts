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
  authType: AuthType;
  roles: string[];
}

export interface IUserCreateResponse {
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
