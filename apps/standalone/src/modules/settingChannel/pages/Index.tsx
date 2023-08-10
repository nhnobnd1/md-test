import { ReactNode, useMemo } from "react";
import { Header } from "src/components/UI/Header";
import Icon from "src/components/UI/Icon";
import { ChannelTitle } from "src/constaint/SettingChannel";
import CategoryChannel from "src/modules/settingChannel/components/CategoryChannel/CategoryChannel";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";

const ChannelIndexPage = () => {
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
        title: ChannelTitle.EmailConfiguration,
        description:
          "Configure the email addresses used for communication with your customers in MooseDesk",
        link: SettingChannelRoutePaths.ChannelEmail.Index,
        icon: <Icon name="emailIntegration" />,
      },
      {
        title: ChannelTitle.WebFormConfiguration,
        description:
          "Configure the help widget that can be added to your website",
        link: SettingChannelRoutePaths.Widgets.Index,
        icon: <Icon name="webForm" />,
      },
    ],
    []
  );
  return (
    <>
      <Header
        title="Channels"
        className="xs:h-[32px] md:h-[40px] flex items-center"
      />
      <div className="mt-5">
        {listCategory.map((item, index) => (
          <CategoryChannel
            className="mb-6 hover:cursor-pointer"
            title={item.title}
            description={item.description ?? undefined}
            link={item.link}
            icon={item.icon}
            key={`category-${index}`}
          />
        ))}
      </div>
    </>
  );
};

export default ChannelIndexPage;
