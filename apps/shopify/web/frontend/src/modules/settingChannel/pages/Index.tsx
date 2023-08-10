import { PageComponent, TokenManager, useNavigate } from "@moose-desk/core";
import { Icon, Layout, LegacyCard, Page, Text } from "@shopify/polaris";
import {
  ChecklistAlternateMajor,
  EmailNewsletterMajor,
} from "@shopify/polaris-icons";
import { FunctionComponent, SVGProps, useCallback, useMemo } from "react";
import { useSubdomain } from "src/hooks/useSubdomain";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";
import RightIcon from "~icons/ic/round-keyboard-arrow-right";

interface SettingChannelIndexPageProps {}

const SettingChannelIndexPage: PageComponent<
  SettingChannelIndexPageProps
> = () => {
  const navigate = useNavigate();
  const { getSubDomain, getDomainStandalone } = useSubdomain();

  const getDomain = useCallback(() => {
    return `https://${getSubDomain()}${getDomainStandalone()}`;
  }, [import.meta.env.MODE, getSubDomain, getDomainStandalone]);

  const handleRedirectStandaloneCreate = useCallback(() => {
    const baseToken = TokenManager.getToken("base_token");
    const refreshToken = TokenManager.getToken("refresh_token");
    window.open(
      `${getDomain()}/setting-channel/channel-email/redirect?baseToken=${baseToken}&refreshToken=${refreshToken}&type=create`
    );
  }, [window.location.href, import.meta.env.MODE]);
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
          "Configure the email addresses used for communication with your customers in MooseDesk",
        link: SettingChannelRoutePaths.ChannelEmail.Index,
        icon: () => <EmailNewsletterMajor />,
        onConfigure: () => {
          handleRedirectStandaloneCreate();
        },
      },
      {
        title: "Help Widget Configuration",
        description:
          "Configure the help widget that can be added to your website",
        link: "",
        icon: () => <ChecklistAlternateMajor />,
        onConfigure: () => {
          navigate(SettingChannelRoutePaths.Widgets.Index);
        },
      },
    ],
    []
  );
  return (
    <Page title="Channels" fullWidth>
      <Layout>
        <Layout.Section>
          {listCategory.map((card, index) => (
            <div
              onClick={() => {
                card.onConfigure();
              }}
              className="mb-6 hover:cursor-pointer"
              key={`category-${index}`}
            >
              <LegacyCard sectioned>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-2 items-center">
                      <div>
                        <Icon source={card.icon}></Icon>
                      </div>
                      {/* <h1>{card.title}</h1> */}
                      <Text variant="headingMd" as="h6">
                        {card.title}
                      </Text>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-gray-500">{card.description}</div>
                    </div>
                  </div>
                  <div className="">
                    <RightIcon style={{ fontSize: 28 }} />
                  </div>
                </div>
              </LegacyCard>
            </div>
          ))}
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default SettingChannelIndexPage;
