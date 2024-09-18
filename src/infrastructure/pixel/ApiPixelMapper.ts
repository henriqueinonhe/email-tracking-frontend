import { Pixel } from "@/domain/pixel/Pixel";
import { ApiTracker } from "../trackers/ApiTracker";

export const ApiPixelMapper = {
  fromApi: (tracker: ApiTracker): Pixel => {
    return {
      id: tracker.id,
      identifier: tracker.identifier,
      recipient: tracker.recipient,
      createdAt: new Date(tracker.createdAt),
    };
  },
};
