import { PageComponent } from "@moose-desk/core";
import InformationLayout from "src/modules/BetaVersion/components/InformationLayout";

interface CustomerBetaIndexPageProps {}

const CustomerBetaIndexPage: PageComponent<CustomerBetaIndexPageProps> = () => {
  return <InformationLayout layout="customer" />;
};

export default CustomerBetaIndexPage;
