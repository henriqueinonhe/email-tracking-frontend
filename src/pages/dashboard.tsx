import { CreatePixelForm } from "@/view/pixel/CreatePixelForm";
import { pageWithAuthRequired } from "@/view/user/pageWithAuthRequired";

const DashboardPage = () => {
  return (
    <>
      <CreatePixelForm />
    </>
  );
};

export default pageWithAuthRequired(DashboardPage);
