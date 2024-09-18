import { apiHttpClient } from "../apiHttpClient";
import { ApiTracker } from "./ApiTracker";

export type CreateTrackerParameters = {
  identifier: string;
  recipient: string;
};

export const createTracker = async ({
  identifier,
  recipient,
}: CreateTrackerParameters) => {
  const response = await apiHttpClient.request<ApiTracker>("/trackers", {
    method: "POST",
    body: {
      identifier,
      recipient,
    },
  });

  if (response.status !== 201) {
    throw new Error("Error creating tracker!");
  }

  return response.data;
};
