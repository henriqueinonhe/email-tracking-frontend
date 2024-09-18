import { Tracker } from "@/domain/tracker/Tracker";
import { ApiTracker } from "./ApiTracker";

export const ApiTrackerMapper = {
  fromApi: (apiTracker: ApiTracker): Tracker => {
    return {
      id: apiTracker.id,
      identifier: apiTracker.identifier,
      recipient: apiTracker.recipient,
      createdAt: new Date(apiTracker.createdAt),
    };
  },
};
