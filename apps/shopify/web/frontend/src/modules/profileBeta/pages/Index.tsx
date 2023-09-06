import InformationLayout from "@moose-beta/components/InformationLayout";
import { PageComponent } from "@moose-desk/core";

interface ProfileBetaIndexPageProps {}

const ProfileBetaIndexPage: PageComponent<ProfileBetaIndexPageProps> = () => {
  return (
    <>
      <InformationLayout layout="profile" />
    </>
  );
};

export default ProfileBetaIndexPage;
