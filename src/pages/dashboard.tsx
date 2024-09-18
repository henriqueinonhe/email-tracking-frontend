import { CreatePixelForm } from "@/view/pixel/CreatePixelForm";
import { PixelsList } from "@/view/pixel/PixelsList";
import { pageWithAuthRequired } from "@/view/user/pageWithAuthRequired";

const DashboardPage = () => {
  return (
    <>
      <CreatePixelForm />
      <PixelsList />
    </>
  );
};

export default pageWithAuthRequired(DashboardPage);
