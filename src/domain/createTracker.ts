import { apiHttpClient } from "../infrastructure/apiHttpClient";

export type CreateTrackerParameters = {
  identifier: string;
  recipient: string;
};

export const createTracker = async ({
  identifier,
  recipient,
}: CreateTrackerParameters) => {
  const response = await apiHttpClient.request("/trackers", {
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
