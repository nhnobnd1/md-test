import { PageComponent } from "@moose-desk/core";
import { Badge } from "antd";
import Images from "src/assets/images";

interface AuthIndexPageProps {}

const AuthIndexPage: PageComponent<AuthIndexPageProps> = () => {
  return (
    <>
      AuthIndexPage
      <img src={Images.Logo.LogoMooseDesk} width="40" alt="" />
      <Badge count={11} showZero color="#faad14" />
    </>
  );
};

export default AuthIndexPage;
