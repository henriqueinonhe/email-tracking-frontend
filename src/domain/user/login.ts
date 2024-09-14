import { retex } from "return-exception";
import { isError } from "@/errors/isError";
import { apiHttpClient } from "@/infrastructure/apiHttpClient";

export const login = async (email: string, password: string) => {
  const [response, error] = await retex(
    () =>
      apiHttpClient.request<void>("/users/login", {
        method: "POST",
        body: {
          email,
          password,
        },
      }),
    [isError],
  );

  if (error) {
    return "UnexpectedError";
  }

  if (response.status === 200) {
    return "Sucessful";
  }

  if (response.status === 401) {
    return "InvalidCredentials";
  }

  return "UnexpectedError";
};
