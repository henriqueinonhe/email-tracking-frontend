import { apiHttpClient } from "../apiHttpClient";
import { ApiImpression } from "./ApiImpression";

export const getMostRecentImpressions = async () => {
  const response = await apiHttpClient.request<Array<ApiImpression>>(
    "/impressions/mostRecent",
  );

  if (response.status !== 200) {
    return "UnexpectedError";
  }

  return response.data;
};
