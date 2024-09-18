import { createTracker, CreateTrackerParameters } from "@/domain/createTracker";
import { getTrackers } from "@/domain/tracker/getTrackers";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTrackers = () => {
  const {
    data: trackers,
    status: trackersStatus,
    refetch,
  } = useQuery({
    queryKey: ["Trackers"],
    queryFn: async () => {
      const result = await getTrackers();

      if (typeof result === "string") {
        throw new Error(result);
      }

      return result;
    },
    retry: (_, error) => error.message !== "NotAuthenticated",
  });

  type CreateTrackerMutationParameters = CreateTrackerParameters;
  const { status: createTrackerStatus, mutateAsync: createTrackerMutation } =
    useMutation({
      mutationFn: async ({
        identifier,
        recipient,
      }: CreateTrackerMutationParameters) => {
        const result = await createTracker({
          identifier,
          recipient,
        });

        return result;
      },
      onSuccess: () => {
        refetch();
      },
    });

  return {
    trackers,
    trackersStatus,
    createTracker: createTrackerMutation,
    createTrackerStatus,
  };
};
