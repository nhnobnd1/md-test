import { PageComponent } from "@moose-desk/core";
import { Badge } from "antd";
import Images from "src/assets/images";

interface AuthIndexPageProps {}

const AuthIndexPage: PageComponent<AuthIndexPageProps> = () => {
  return (
    <>
      <span>
        AuthIndexPage
        <Badge className="ml-2" count={11} showZero color="#faad14" />
      </span>

      <img src={Images.Logo.LogoMooseDesk} width="40" alt="" />
    </>
  );
};

export default AuthIndexPage;
