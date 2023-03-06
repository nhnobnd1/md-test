import { useNavigate } from "@moose-desk/core";
import { Button, Tabs } from "antd";
import { useMemo } from "react";
import { Header } from "src/components/UI/Header";
import Appearance from "src/modules/settingChannel/components/Widgets/Appearance/Appearance";
import General from "src/modules/settingChannel/components/Widgets/General/General";
import Integration from "src/modules/settingChannel/components/Widgets/Integration/Integration";
import useWidgetSetting from "src/modules/settingChannel/store/useSetting";
interface ChannelEmailProps {}

const Widgets = (props: ChannelEmailProps) => {
  const navigate = useNavigate();

  const widgetSetting = useWidgetSetting((state) => state.widgetSetting);
  console.log({ widgetSetting });

  const onChange = (key: string) => {
    console.log(key);
  };

  const FooterButton = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: 20,
          position: "sticky",
          bottom: 0,
          // left: 300,
          background: "white",
          width: "100%",
          zIndex: 1,
          paddingTop: 10,
          paddingBottom: 10,
          // height: 50,
        }}
      >
        <Button size="large" style={{ marginRight: 10, marginLeft: 10 }}>
          Cancel
        </Button>

        <Button size="large" type="primary">
          Save
        </Button>
      </div>
    );
  };

  const items = useMemo(() => {
    return [
      {
        label: `General`,
        key: "1",
        children: (
          <>
            <General />
            <FooterButton />
          </>
        ),
      },
      {
        label: `Appearance`,
        key: "2",
        children: (
          <>
            <Appearance />
            <FooterButton />
          </>
        ),
      },
      {
        label: `Integration`,
        key: "3",
        children: <Integration />,
      },
    ];
  }, []);

  return (
    <>
      <Header title="Web Form ">
        <div className="flex-1 flex justify-end"></div>
      </Header>
      <Tabs onChange={onChange} type="card" items={items} />
    </>
  );
};

export default Widgets;
