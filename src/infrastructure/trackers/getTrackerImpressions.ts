import { apiHttpClient } from "../apiHttpClient";
import { ApiImpression } from "../impressions/ApiImpression";

export type GetTrackerImpressionsParameters = {
  trackerId: string;
  cursor?: string;
};

export const getTrackerImpressions = async ({
  trackerId,
  cursor,
}: GetTrackerImpressionsParameters) => {
  const response = await apiHttpClient.request<Array<ApiImpression>>(
    `/trackers/${trackerId}/impressions${cursor ? `?cursor=${cursor}` : ""}`,
  );

  if (response.status === 401) {
    return "NotAuthenticated";
  }

  if (response.status !== 200) {
    return "UnexpectedError";
  }

  return response.data;
};
