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

export interface IuserInvitation {
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
} 

export interface IuserFromInvitation {
  tokenHash: string;
  password: string;
  isTermsOfSale: boolean;
}

export interface IPasswordUpdate {
  oldPassword: string;
  newPassword: string;
}

export interface IuserInvitation {
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
} 

export interface IuserFromInvitation {
  tokenHash: string;
  password: string;
  isTermsOfSale: boolean;
}

export interface IPasswordUpdate {
  oldPassword: string;
  newPassword: string;
}

export interface IPasswordResetRequest {
  email: string;
}

export interface IPasswordReset {
  token: string;
  password: string;
}
export interface IPasswordChange {
  oldPassword: string;
  newPassword: string;
}

export interface IUserPreference {
  _id: string;
  user: string | IUser;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  marketingConsent: boolean;
  cookiesConsent: boolean;
  personalizedAds: boolean;
  language: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}
