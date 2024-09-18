import { Impression } from "@/domain/impression/Impression";
import { ApiImpression } from "./ApiImpression";

export const ApiImpressionMapper = {
  fromApi: (apiImpression: ApiImpression): Impression => {
    return {
      ...apiImpression,
      date: new Date(apiImpression.date),
    };
  },
};
