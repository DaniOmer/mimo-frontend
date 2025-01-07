import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  iat: number;
  roles: string[];
  permissions: string[];
  [key: string]: any;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
