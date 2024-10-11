import { apiHttpClient } from "../apiHttpClient";

export const logout = async () => {
  await apiHttpClient.request("/users/logout", {
    method: "POST",
    body: {},
  });
};
