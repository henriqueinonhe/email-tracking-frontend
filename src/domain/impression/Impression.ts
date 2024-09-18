export type Impression = {
  id: string;
  ipHash: string | null;
  userAgent: string | null;
  geolocation: {
    isp: string | null;
    country: string | null;
    state: string | null;
    city: string | null;
  };
  date: Date;
};
