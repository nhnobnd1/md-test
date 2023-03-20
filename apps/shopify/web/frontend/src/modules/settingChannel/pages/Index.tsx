import { PageComponent, useNavigate } from "@moose-desk/core";
import { Button, Card, Icon, Layout, Page } from "@shopify/polaris";
import {
  ChatMajor,
  ChecklistAlternateMajor,
  EmailNewsletterMajor,
  SocialPostMajor,
} from "@shopify/polaris-icons";
import { FunctionComponent, SVGProps, useMemo } from "react";
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
      icon: FunctionComponent<SVGProps<SVGSVGElement>>;
      onConfigure: () => void;
    }>
  >(
    () => [
      {
        title: "Email Configuration",
        description:
          "Configure the web form widget that can be added to your website",
        link: SettingChannelRoutePaths.ChannelEmail.Index,
        icon: () => <EmailNewsletterMajor />,
        onConfigure: () => {
          navigate(SettingChannelRoutePaths.ChannelEmail.Index);
        },
      },
      {
        title: "Webform Configuration",
        description:
          "Configure the web form widget that can be added to your website",
        link: "",
        icon: () => <ChecklistAlternateMajor />,
        onConfigure: () => {
          navigate(SettingChannelRoutePaths.Widgets.Index);
        },
      },
      {
        title: "Live Chat Configuration",
        link: "",
        icon: () => <ChatMajor />,
        onConfigure: () => {},
      },
      {
        title: "Facebook, Instagram and Messenger Configuration",
        link: "",
        icon: () => <SocialPostMajor />,
        onConfigure: () => {},
      },
    ],
    []
  );
  return (
    <Page title="Channels" fullWidth>
      <Layout>
        <Layout.Section>
          {listCategory.map((card, index) => (
            <div className="mb-6" key={`category-${index}`}>
              <Card
                title={
                  <div className="flex gap-2 items-center">
                    <div>
                      <Icon source={card.icon}></Icon>
                    </div>
                    <div>{card.title}</div>
                  </div>
                }
                sectioned
              >
                <div className="flex justify-between items-center">
                  <div>{card.description}</div>
                  <Button size="slim" onClick={() => card.onConfigure()}>
                    Configure
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default SettingChannelIndexPage;
