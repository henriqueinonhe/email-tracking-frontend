import { Tracker } from "@/domain/tracker/Tracker";

export const Urls = {
  home: () => "/",
  dashboard: () => "/dashboard",
  pixel: (tracker: Tracker) => `/pixels/${tracker.id}`,
};
