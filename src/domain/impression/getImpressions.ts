import { ApiImpressionMapper } from "@/infrastructure/impressions/ApiImpressionMapper";
import { getTrackerImpressions } from "@/infrastructure/trackers/getTrackerImpressions";

export type GetImpressionsParameters = {
  cursor?: string;
  trackerId: string;
};

export const getImpressions = async ({
  cursor,
  trackerId,
}: GetImpressionsParameters) => {
  const result = await getTrackerImpressions({ cursor, trackerId });

  if (typeof result === "string") {
    return result;
  }

  return result.map((impression) => ApiImpressionMapper.fromApi(impression));
};
