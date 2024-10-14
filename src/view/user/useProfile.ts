import { getProfile } from "@/domain/user/getProfile";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  const adaptedGetProfile = async () => {
    const result = await getProfile();

    if (result === "NotAuthenticated") {
      throw new Error("NotAuthenticated");
    }

    if (result === "UnexpectedError") {
      throw new Error("UnexpectedError");
    }

    return result;
  };

  const { data, status, error } = useQuery({
    queryKey: ["Profile"],
    queryFn: adaptedGetProfile,
    retry: (_, error) => {
      return error.message !== "NotAuthenticated";
    },
    staleTime: 1000 * 60 * 30,
  });

  return {
    profile: data,
    profileStatus: status,
    profileError: error,
  };
};
