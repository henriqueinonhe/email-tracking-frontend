import { apiHttpClient } from "../apiHttpClient";
import { ApiTracker } from "./ApiTracker";

// TEMP TOKEN
export const getTrackerById = async (id: string, token: string) => {
  const response = await apiHttpClient.request<ApiTracker>(`/trackers/${id}`, {
    headers: {
      Cookie: `auth=${token}`,
    },
  });

  if (response.status === 404) {
    return "NotFound";
  }

  if (response.status !== 200) {
    return "UnexpectedError";
  }

  return response.data;
};
