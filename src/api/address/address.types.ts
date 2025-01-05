import { IUser } from "../user/user.types";

export interface IAddress {
  _id: string;
  firstName: string;
  lastName: string;
  streetNumber: string;
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  isBilling: boolean;
  isShipping: boolean;
  isDefault: boolean;
  user: string | IUser;
}
