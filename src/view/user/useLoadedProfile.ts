import { useProfile } from "./useProfile";

export const useLoadedProfile = () => {
  const { profileStatus, profile } = useProfile();

  if (profileStatus !== "success") {
    throw new Error(
      `Profile was expected to be succesfully loaded here! Status: ${profileStatus}`,
    );
  }

  return { profile: profile! };
};
