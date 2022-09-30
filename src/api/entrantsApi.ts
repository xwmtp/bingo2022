import { mapToUser, User } from "../domain/User";
import { mockAllUsers } from "../domain/mocks/MockData";
import { useQuery } from "react-query";
import { websiteSettings } from "../Settings";
import { entrantsResponse } from "./responses/entrantsResponse20220930";

const getAllEntrants = async (): Promise<User[]> => {
  try {
    const entrantDtos = entrantsResponse; //await getApi().getEntrants();
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
