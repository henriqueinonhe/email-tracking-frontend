export type ApiImpression = {
  id: string;
  ipHash: string | null;
  userAgent: string | null;
  geolocation: {
    isp: string | null;
    country: string | null;
    state: string | null;
    city: string | null;
  };
  date: string;
};
