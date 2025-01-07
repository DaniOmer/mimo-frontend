import { httpClientPrivate } from "../../pluggins"; 
import type { 
  IUser, 
  IuserInvitation, 
  IuserFromInvitation, 
  IRole 
} from "../user/user.types";

const ROUTE_PREFIX = "/users";

export async function fetchAllUsersAdmin(signal?: AbortSignal): Promise<IUser[]> {
  try {
    const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/`, { signal });
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON FETCHING USERS : ", error);
    throw error;
  }
}

export async function fetchUserById(userId: string, signal?: AbortSignal): Promise<IUser> {
  try {
  const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/${userId}`, { signal });
  return response.data.data;
  } catch (error) {
    console.log("ERROR ON FETCHING USER BY ID : ", error);
    throw error;
  }
  
}

export async function updateUserAdmin(
  userId: string,
  userData: Partial<IUser>,
  signal?: AbortSignal
): Promise<IUser> {
  try {
    const response = await httpClientPrivate.put(`${ROUTE_PREFIX}/${userId}`, userData, { signal });
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON UPDATING USER : ", error);
    throw error;
  }
}

export async function deleteUserAdmin(userId: string, signal?: AbortSignal): Promise<void> {
  try {
    await httpClientPrivate.delete(`${ROUTE_PREFIX}/${userId}`, { signal });
  } catch (error) {
    console.log("ERROR ON DELETING USER : ", error);
    throw error;
  }
}

export async function CreateInvitation(
  invitationData: IuserInvitation,
  signal?: AbortSignal
): Promise<void> {
  try {
    await httpClientPrivate.post('/invitations/', invitationData, { signal });
  } catch (error) {
    console.log("ERROR ON CREATING INVITATION : ", error);
    throw error;
  }
}

export async function createUserFromInvitation(
  invitationData: IuserFromInvitation,
  signal?: AbortSignal
): Promise<void> {
  try {
    await httpClientPrivate.post(`${ROUTE_PREFIX}/createUserFromInvitation`, invitationData, { signal });
  } catch (error) {
    console.log("ERROR ON CREATING USER FROM INVITATION : ", error);
    throw error;
  }
}


export async function toggleUserStatusAdmin(
  userId: string,
  isDisabled: boolean,
  signal?: AbortSignal
): Promise<IUser> {
  try {
    const response = await httpClientPrivate.patch(`${ROUTE_PREFIX}/${userId}/status`, { isDisabled }, { signal });
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON TOGGLING USER STATUS : ", error);
    throw error;
  }
}

export async function fetchAllRoles(signal?: AbortSignal): Promise<IRole[]> {
  try {
    const response = await httpClientPrivate.get('/roles', { signal });
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON FETCHING ROLES : ", error);
    throw error;
  }
}

export async function deleteMultipleUsers(
  userIds: string[],
  signal?: AbortSignal
): Promise<void> {
  try {
  await httpClientPrivate.delete(`${ROUTE_PREFIX}/multiple/delete`, {
    data: { ids: userIds }, 
    signal
  });

  } catch (error) {
    console.log("ERROR ON DELETING MULTIPLE USERS : ", error);
    throw error;
  }
}


export async function disableMultipleUsers(
  userIds: string[],
  isDisabled: boolean,
  signal?: AbortSignal
): Promise<IUser[]> {

  try {
    const response = await httpClientPrivate.patch(`${ROUTE_PREFIX}/multiple/status`, {
      ids: userIds,
      isDisabled
    }, { signal });
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON DISABLING MULTIPLE USERS : ", error);
    throw error;
  }
}
