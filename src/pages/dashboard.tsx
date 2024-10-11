import { MostRecentImpressions } from "@/view/impression/MostRecentImpressions";
import { PixelsList } from "@/view/pixel/PixelsList";
import { pageWithAuthRequired } from "@/view/user/pageWithAuthRequired";
import { ProfileHeader } from "@/view/user/ProfileHeader";

const DashboardPage = () => {
  return (
    <>
      <ProfileHeader />

      <MostRecentImpressions />

      <PixelsList />
    </>
  );
};

export default pageWithAuthRequired(DashboardPage);
