import { env } from "../config/env";

export type RequestConfig = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD";
  body?: unknown;
  headers?: Record<string, string>;
};

export const apiHttpClient = {
  request: async <T = unknown>(path: string, config: RequestConfig = {}) => {
    const url = `${env.NEXT_PUBLIC_API_BASE_URL}${path}`;

    const response = await fetch(url, {
      method: config.method ?? "GET",
      body: JSON.stringify(config.body ?? undefined),
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
      credentials: "include",
    });

    const formattedResponse = {
      status: response.status,
      headers: response.headers,
      data: (await response.json()) as T,
    };

    return formattedResponse;
  },
};
