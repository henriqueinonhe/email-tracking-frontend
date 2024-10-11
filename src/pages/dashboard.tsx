import { MostRecentImpressions } from "@/view/impression/MostRecentImpressions";
import { PixelsList } from "@/view/pixel/PixelsList";
import { pageWithAuthRequired } from "@/view/user/pageWithAuthRequired";

const DashboardPage = () => {
  return (
    <>
      <MostRecentImpressions />
      <PixelsList />
    </>
  );
};

export default pageWithAuthRequired(DashboardPage);
