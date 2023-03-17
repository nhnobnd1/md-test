import { useJob } from "@moose-desk/core";
import {
  BaseListHelpWidgetRequest,
  GetListHelpWidgetRequest,
  HelpWidget,
  HelpWidgetRepository,
} from "@moose-desk/repo";
import { Button, Tabs } from "antd";
import { useEffect, useMemo, useState } from "react";
import { catchError, map, of } from "rxjs";
import { Header } from "src/components/UI/Header";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import Appearance from "src/modules/settingChannel/components/Widgets/Appearance/Appearance";
import General from "src/modules/settingChannel/components/Widgets/General/General";
import Integration from "src/modules/settingChannel/components/Widgets/Integration/Integration";
import useUpdateSave from "src/modules/settingChannel/store/saveUpdateWidget";
import useWidgetSetting, {
  initialDefaultWidget,
} from "src/modules/settingChannel/store/useSetting";

const defaultFilter: () => GetListHelpWidgetRequest = () => ({
  page: 1,
  limit: env.DEFAULT_PAGE_SIZE,
  query: "",
  sortBy: undefined,
  sortOrder: undefined,
});
const WidgetDetail = () => {
  const message = useMessage();
  const notification = useNotification();
  const [widget, setWidget] = useState<HelpWidget>();

  const widgetSetting = useWidgetSetting((state) => state.widgetSetting);
  const updateSave = useUpdateSave((state) => state.changeUpdate);
  const updateCancel = useUpdateSave((state) => state.changeCancel);
  const updateWidgetSetting = useWidgetSetting(
    (state) => state.updateWidgetSetting
  );
  const [filterData, setFilterData] =
    useState<BaseListHelpWidgetRequest>(defaultFilter);
  const { run: getListHelpWidgetApi, processing: loadingList } = useJob(
    (payload: GetListHelpWidgetRequest) => {
      return HelpWidgetRepository()
        .getList(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              setWidget(data.data[0]);

              updateWidgetSetting({
                ...data?.data[0]?.settings,
                id: data.data[0]._id,
              });
            } else {
              message.error("Get data customer failed");
            }
          })
        );
    }
  );
  const { run: updateHelpWidgetApi } = useJob(
    (id: string, object: any) => {
      message.loading.show("Updating Widget");

      return HelpWidgetRepository()
        .update(id, object)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                message.loading.hide();
                notification.success(
                  "Your changes have been updated successfully."
                );

                updateWidgetSetting(data.data.settings);
                setWidget(data.data);
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
  const handleCancel = () => {
    updateWidgetSetting(widget?.settings);
    updateCancel(new Date());
  };

  const handleSaveWidget = () => {
    updateHelpWidgetApi(widget?._id as string, {
      name: widget?.name,
      settings: widgetSetting,
    });

    updateSave(new Date());
  };
  useEffect(() => {
    getListHelpWidgetApi(filterData);
    return () => {
      updateWidgetSetting(initialDefaultWidget);
    };
  }, []);

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
        <Button
          size="large"
          style={{ marginRight: 10, marginLeft: 10 }}
          onClick={handleCancel}
        >
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
      {loadingList ? (
        <></>
      ) : (
        <Tabs
          onChange={onChange}
          type="card"
          items={items}
          defaultActiveKey={"1"}
        />
      )}
    </>
  );
};

export default WidgetDetail;
