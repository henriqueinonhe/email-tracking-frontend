import { ApiImpressionMapper } from "@/infrastructure/impressions/ApiImpressionMapper";
import { getMostRecentImpressions as infraGetMostRecentImpressions } from "@/infrastructure/impressions/getMostRecentImpressions";

export const getMostRecentImpressions = async () => {
  const apiMostRecentImpressions = await infraGetMostRecentImpressions();

  if (typeof apiMostRecentImpressions === "string") {
    return apiMostRecentImpressions;
  }

  return apiMostRecentImpressions.map((e) => ApiImpressionMapper.fromApi(e));
};
