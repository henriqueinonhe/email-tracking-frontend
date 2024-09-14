import { Profile } from "@/domain/user/Profile";
import { ApiProfile } from "./ApiProfile";

export const ApiProfileMapper = {
  fromApi: (apiProfile: ApiProfile): Profile => {
    return {
      id: apiProfile.id,
      name: apiProfile.name,
      email: apiProfile.email,
    };
  },
};
