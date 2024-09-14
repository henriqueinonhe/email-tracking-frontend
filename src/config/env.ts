import { cleanEnv, str } from "envalid";
import { Environment } from "./Environment";

const rawEnv = {
  NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
};

export const env = cleanEnv(rawEnv, {
  NEXT_PUBLIC_ENVIRONMENT: str<Environment>(),
  NEXT_PUBLIC_API_BASE_URL: str(),
});
