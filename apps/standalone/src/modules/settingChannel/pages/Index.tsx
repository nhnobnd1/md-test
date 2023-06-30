import { ReactNode, useMemo } from "react";
import { Header } from "src/components/UI/Header";
import { ChannelTitle } from "src/constaint/SettingChannel";
import CategoryChannel from "src/modules/settingChannel/components/CategoryChannel/CategoryChannel";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";
import MdiEmailOpenOutline from "~icons/mdi/email-open-outline";
import TablerCheckupList from "~icons/tabler/checkup-list";

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
        icon: <MdiEmailOpenOutline />,
      },
      {
        title: ChannelTitle.WebFormConfiguration,
        description:
          "Configure the web form widget that can be added to your website",
        link: SettingChannelRoutePaths.Widgets.Index,
        icon: <TablerCheckupList />,
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
