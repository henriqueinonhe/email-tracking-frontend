import { MostRecentImpressions } from "@/view/impression/MostRecentImpressions";
import { CreatePixelForm } from "@/view/pixel/CreatePixelForm";
import { PixelsList } from "@/view/pixel/PixelsList";
import { pageWithAuthRequired } from "@/view/user/pageWithAuthRequired";

const DashboardPage = () => {
  return (
    <>
      <MostRecentImpressions />
      <CreatePixelForm />
      <PixelsList />
    </>
  );
};

export default pageWithAuthRequired(DashboardPage);
