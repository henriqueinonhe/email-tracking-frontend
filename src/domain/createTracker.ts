import { ApiTrackerMapper } from "@/infrastructure/trackers/ApiTrackerMapper";
import { createTracker as apiCreateTracker } from "@/infrastructure/trackers/createTracker";

export type CreateTrackerParameters = {
  identifier: string;
  recipient: string;
};

export const createTracker = async ({
  identifier,
  recipient,
}: CreateTrackerParameters) => {
  const result = await apiCreateTracker({
    identifier,
    recipient,
  });

  return ApiTrackerMapper.fromApi(result);
};
