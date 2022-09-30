import { mapToUser, User } from "../domain/User";
import { getApi } from "./api";
import { mockAllUsers } from "../domain/mocks/MockData";
import { useQuery } from "react-query";
import { websiteSettings } from "../Settings";

const getAllEntrants = async (): Promise<User[]> => {
  try {
    const entrantDtos = await getApi().getEntrants();
    return entrantDtos.map(mapToUser);
  } catch (error) {
    if (websiteSettings.USE_MOCK_DATA) {
      return mockAllUsers;
    }
    throw error;
  }
};

export const useAllEntrants = () => {
  return useQuery<User[], Error>("allEntrants", getAllEntrants);
};
