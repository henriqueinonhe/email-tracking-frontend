import { Pixel } from "@/domain/pixel/Pixel";
import { Tracker } from "@/domain/Tracker";

export const ApiPixelMapper = {
  fromApi: (tracker: Tracker): Pixel => {
    return {
      id: tracker.id,
      identifier: tracker.identifier,
      recipient: tracker.recipient,
      createdAt: new Date(tracker.createdAt),
    };
  },
};
