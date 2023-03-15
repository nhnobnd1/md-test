import { useJob, useNavigate } from "@moose-desk/core";
import { HelpWidget, HelpWidgetRepository } from "@moose-desk/repo";
import { Button, Tabs } from "antd";
import { useMemo, useState } from "react";
import { catchError, map, of } from "rxjs";
import { Header } from "src/components/UI/Header";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import Appearance from "src/modules/settingChannel/components/Widgets/Appearance/Appearance";
import General from "src/modules/settingChannel/components/Widgets/General/General";
import Integration from "src/modules/settingChannel/components/Widgets/Integration/Integration";
import useWidgetSetting from "src/modules/settingChannel/store/useSetting";

const WidgetDetail = ({ widgetProps }: { widgetProps: HelpWidget }) => {
  const navigate = useNavigate();
  const message = useMessage();
  const notification = useNotification();
  const [widget, setWidget] = useState<HelpWidget>(widgetProps);

  const widgetSetting = useWidgetSetting((state) => state.widgetSetting);

  const { run: updateHelpWidgetApi } = useJob(
    (id: string, object: any) => {
      message.loading.show("Updating Widget");
      return HelpWidgetRepository()
        .update(widgetProps?._id, object)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                message.loading.hide();
                notification.success("Widget has been updated successfully.");
              } else {
                message.loading.hide();
                if (data.statusCode === 409) {
                  notification.error(`Error`);
                }
              }
            },
            catchError((err) => {
              message.loading.hide();
              const errorCode = err.response.status;
              if (errorCode === 409) {
                notification.error(`Error`);
              } else {
                notification.error("Widget has been updated failed.");
              }
              return of(err);
            })
          )
        );
    },
    { showLoading: false }
  );

  const onChange = (key: string) => {
    console.log(key);
  };

  const handleSaveWidget = () => {
    console.log("click update", widgetSetting);
    updateHelpWidgetApi(widget?._id as string, {
      name: widget?.name,
      settings: widgetSetting,
    });
  };

  const FooterButton = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 20,
          position: "sticky",
          bottom: 0,
          // left: 300,
          background: "white",
          width: "100%",
          zIndex: 1,
          paddingTop: 10,
          paddingBottom: 10,
          // backgroundColor: "red",
          // height: 50,
        }}
      >
        <Button size="large" style={{ marginRight: 10, marginLeft: 10 }}>
          Cancel
        </Button>

        <Button size="large" type="primary" onClick={handleSaveWidget}>
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
        children: <Integration idWidget={null} />,
      },
    ];
  }, [widget, widgetSetting]);

  return (
    <>
      <Header title="Web Form ">
        <div className="flex-1 flex justify-end"></div>
      </Header>
      <Tabs onChange={onChange} type="card" items={items} />
    </>
  );
};

export default WidgetDetail;
