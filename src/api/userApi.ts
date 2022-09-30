import { getApi, getXXsrfToken } from "./api";
import { mapToUser, User } from "../domain/User";
import { useQuery } from "react-query";
import { Role } from "@xwmtp/bingo-tournament";
import { websiteSettings } from "../Settings";
import { mockAllUsers } from "../domain/mocks/MockData";

const getUser = async (): Promise<User | undefined> => {
  try {
    const userDto = await getApi().getUser();
    return mapToUser(userDto);
  } catch {
    return undefined;
  }
};

export const useUser = () => {
  return useQuery<User | undefined, Error>("user", getUser, { retry: 1 });
};

export const signUp = async (): Promise<void> => {
  await getApi().signUp();
};

export const withdraw = async (): Promise<void> => {
  await getApi().withdraw();
};

export const addRole = async (addRole: { userId: string; role: Role }): Promise<void> => {
  await getApi().addRole({
    userId: addRole.userId,
    role: addRole.role,
  });
};

export const removeRole = async (removeRole: { userId: string; role: Role }): Promise<void> => {
  await getApi().removeRole({
    userId: removeRole.userId,
    role: removeRole.role,
  });
};

const getAllUsers = async (): Promise<User[]> => {
  try {
    const userDtos = await getApi().getAllUsers();
    return userDtos.map(mapToUser);
  } catch (error) {
    if (websiteSettings.USE_MOCK_DATA) {
      return mockAllUsers;
    }
    throw error;
  }
};

export const useAllUsers = () => {
  return useQuery<User[], Error>("allUsers", getAllUsers);
};

export const logout = async () => {
  try {
    await fetch(websiteSettings.LOGOUT_URL as string, {
      method: "post",
      credentials: "include",
      headers: {
        "X-XSRF-TOKEN": getXXsrfToken(),
      },
    });
  } catch (_) {}
};
