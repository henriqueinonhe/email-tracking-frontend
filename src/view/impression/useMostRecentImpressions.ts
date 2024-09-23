import { getMostRecentImpressions } from "@/domain/impression/getMostRecentImpressions";
import { useQuery } from "@tanstack/react-query";

export const useMostRecentImpressions = () => {
  const { data: mostRecentImpressions, status: mostRecentImpressionsStatus } =
    useQuery({
      queryKey: ["MostRecentImpressions"],
      queryFn: async () => {
        const result = await getMostRecentImpressions();

        if (typeof result === "string") {
          throw new Error(result);
        }

        return result;
      },
      staleTime: 40000,
      refetchInterval: 40000,
    });

  return {
    mostRecentImpressions,
    mostRecentImpressionsStatus,
  };
};
