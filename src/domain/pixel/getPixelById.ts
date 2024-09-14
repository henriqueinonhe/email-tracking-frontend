import { ApiPixelMapper } from "@/infrastructure/pixel/ApiPixelMapper";
import { getTrackerById } from "@/infrastructure/trackers/getTrackerById";

// TEMP
export const getPixelById = async (pixelId: string, token: string) => {
  const tracker = await getTrackerById(pixelId, token);

  if (typeof tracker === "string") {
    return tracker;
  }

  const pixel = ApiPixelMapper.fromApi(tracker);

  return pixel;
};
