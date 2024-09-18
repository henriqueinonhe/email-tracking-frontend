import { ApiTrackerMapper } from "@/infrastructure/trackers/ApiTrackerMapper";
import { getTrackers as apiGetTrackers } from "@/infrastructure/trackers/getTrackers";

export type GetTrackersParameters = {
  cursor?: string;
};

export const getTrackers = async ({ cursor }: GetTrackersParameters = {}) => {
  const result = await apiGetTrackers({ cursor });

  if (typeof result === "string") {
    return result;
  }

  return result.map((tracker) => ApiTrackerMapper.fromApi(tracker));
};
