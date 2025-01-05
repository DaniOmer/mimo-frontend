import { httpClientPrivate } from "../../pluggins"; 
import type { 
  IUser, 
  IuserInvitation, 
  IuserFromInvitation, 
  IRole 
} from "../user/user.types";

const ROUTE_PREFIX = "/users";

export async function fetchAllUsersAdmin(signal?: AbortSignal): Promise<IUser[]> {
  const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/`, { signal });
  return response.data.data; 
}

export async function fetchUserById(userId: string, signal?: AbortSignal): Promise<IUser> {
  const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/${userId}`, { signal });
  return response.data.data;
}

export async function updateUserAdmin(
  userId: string,
  userData: Partial<IUser>,
  signal?: AbortSignal
): Promise<IUser> {
  const response = await httpClientPrivate.put(`${ROUTE_PREFIX}/${userId}`, userData, { signal });
  return response.data.data;
}

export async function deleteUserAdmin(userId: string, signal?: AbortSignal): Promise<void> {
  await httpClientPrivate.delete(`${ROUTE_PREFIX}/${userId}`, { signal });
}

export async function CreateInvitation(
  invitationData: IuserInvitation,
  signal?: AbortSignal
): Promise<void> {
  await httpClientPrivate.post('/invitations/', invitationData, { signal });
}

export async function createUserFromInvitation(
  invitationData: IuserFromInvitation,
  signal?: AbortSignal
): Promise<void> {
  await httpClientPrivate.post(`${ROUTE_PREFIX}/createUserFromInvitation`, invitationData, { signal });
}


export async function toggleUserStatusAdmin(
  userId: string,
  isDisabled: boolean,
  signal?: AbortSignal
): Promise<IUser> {
  const response = await httpClientPrivate.patch(`${ROUTE_PREFIX}/${userId}/status`, { isDisabled }, { signal });
  return response.data.data;
}

export async function fetchAllRoles(signal?: AbortSignal): Promise<IRole[]> {
  const response = await httpClientPrivate.get('/roles', { signal });
  return response.data.data;
}
