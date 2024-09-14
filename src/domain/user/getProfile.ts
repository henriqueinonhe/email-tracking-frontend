import { apiHttpClient } from "@/infrastructure/apiHttpClient";
import { ApiProfile } from "@/infrastructure/user/ApiProfile";
import { ApiProfileMapper } from "@/infrastructure/user/ApiProfileMapper";

export const getProfile = async () => {
  const response = await apiHttpClient.request<ApiProfile>("/users/profile");

  if (response.status === 401) {
    return "NotAuthenticated";
  }

  if (response.status !== 200) {
    return "UnexpectedError";
  }

  const apiProfile = response.data;

  const profile = ApiProfileMapper.fromApi(apiProfile);

  return profile;
};
