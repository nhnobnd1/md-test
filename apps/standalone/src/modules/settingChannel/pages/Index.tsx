import { Card } from "antd";
import { ReactNode, useMemo } from "react";
import { Header } from "src/components/UI/Header";
import CategoryChannel from "src/modules/settingChannel/components/CategoryChannel/CategoryChannel";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";
import EntypoSocialFacebook from "~icons/entypo-social/facebook";
import MaterialSymbolsChat from "~icons/material-symbols/chat";
import MdiEmailOpenOutline from "~icons/mdi/email-open-outline";
import TablerCheckupList from "~icons/tabler/checkup-list";

interface ChannelIndexPageProps {}

const ChannelIndexPage = (props: ChannelIndexPageProps) => {
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
        icon: <MdiEmailOpenOutline />,
      },
      {
        title: "Webform Configuration",
        description:
          "Configure the web form widget that can be added to your website",
        link: SettingChannelRoutePaths.Widgets.Index,
        icon: <TablerCheckupList />,
      },
      {
        title: "Live Chat Configuration",
        link: "",
        icon: <MaterialSymbolsChat />,
      },
      {
        title: "Facebook, Instagram and Messenger Configuration",
        link: "",
        icon: <EntypoSocialFacebook />,
      },
    ],
    []
  );
  return (
    <div>
      <Header title="Channels" />
      <div>
        <Card>
          {listCategory.map((item, index) => (
            <CategoryChannel
              className="mb-6"
              title={item.title}
              description={item.description ?? undefined}
              link={item.link}
              icon={item.icon}
              key={`category-${index}`}
            />
          ))}
        </Card>
      </div>
    </div>
  );
};

export default ChannelIndexPage;
