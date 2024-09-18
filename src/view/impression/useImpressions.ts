import { getImpressions } from "@/domain/impression/getImpressions";
import { useQuery } from "@tanstack/react-query";

export const useImpressions = (trackerId: string) => {
  const { data: impressions, status: impressionsStatus } = useQuery({
    queryKey: ["Impressions", trackerId],
    queryFn: async () => {
      const result = await getImpressions({ trackerId });

      if (typeof result === "string") {
        throw new Error(result);
      }

      return result;
    },
    retry: (_, error) => error.message !== "NotAuthenticated",
    staleTime: 40000,
  });

  return {
    impressions,
    impressionsStatus,
  };
};
