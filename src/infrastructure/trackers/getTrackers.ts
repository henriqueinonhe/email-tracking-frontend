import { apiHttpClient } from "../apiHttpClient";
import { ApiTracker } from "./ApiTracker";

export type GetTrackersParameters = {
  cursor?: string;
};

export const getTrackers = async ({ cursor }: GetTrackersParameters) => {
  const response = await apiHttpClient.request<Array<ApiTracker>>(
    `/trackers${cursor ? `?cursor=${cursor}` : ""}`,
  );

  if (response.status === 401) {
    return "NotAuthenticated";
  }

  if (response.status !== 200) {
    return "UnexpectedError";
  }

  return response.data;
};
