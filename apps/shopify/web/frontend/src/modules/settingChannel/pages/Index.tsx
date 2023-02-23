import { PageComponent, useNavigate } from "@moose-desk/core";
import { Layout, LegacyCard, Page } from "@shopify/polaris";
import { ReactNode, useMemo } from "react";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";

interface SettingChannelIndexPageProps {}

const SettingChannelIndexPage: PageComponent<
  SettingChannelIndexPageProps
> = () => {
  const navigate = useNavigate();
  const listCategory = useMemo<
    Array<{
      title: string;
      description?: string;
      link: string;
      icon: ReactNode;
    }>
  >(
    () => [
      {
        title: "Email Configuration",
        description:
          "Configure the web form widget that can be added to your website",
        link: SettingChannelRoutePaths.ChannelEmail.Index,
        icon: <></>,
      },
      {
        title: "Webform Configuration",
        description:
          "Configure the web form widget that can be added to your website",
        link: "",
        icon: <></>,
      },
      {
        title: "Live Chat Configuration",
        link: "",
        icon: <></>,
      },
      {
        title: "Facebook, Instagram and Messenger Configuration",
        link: "",
        icon: <></>,
      },
    ],
    []
  );
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <LegacyCard title="Online store dashboard" sectioned>
            <p>View a summary of your online store’s performance.</p>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default SettingChannelIndexPage;
