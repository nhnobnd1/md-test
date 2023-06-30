import { useJob } from "@moose-desk/core";
import {
  BaseListHelpWidgetRequest,
  GetListHelpWidgetRequest,
  HelpWidget,
  HelpWidgetRepository,
} from "@moose-desk/repo";
import { Card, Skeleton, Tabs } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { MDButton } from "src/components/UI/Button/MDButton";
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
  const { t } = useTranslation();

  const widgetSetting = useWidgetSetting((state) => state.widgetSetting);
  const updateSave = useUpdateSave((state) => state.changeUpdate);
  const updateCancel = useUpdateSave((state) => state.changeCancel);
  const updateWidgetSetting = useWidgetSetting(
    (state) => state.updateWidgetSetting
  );
  const [filterData] = useState<BaseListHelpWidgetRequest>(defaultFilter);
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
              message.error(t("messages:error.get_customer"));
            }
          })
        );
    }
  );
  const { run: updateHelpWidgetApi } = useJob(
    (id: string, object: any) => {
      message.loading.show(t("messages:loading.updating_widget"));

      return HelpWidgetRepository()
        .update(id, object)
        .pipe(
          map(
            ({ data }) => {
              message.loading.hide().then(() => {
                if (data.statusCode === 200) {
                  notification.success(
                    t("messages:success.update_help_widget")
                  );

                  updateWidgetSetting(data.data.settings);
                  setWidget(data.data);
                } else {
                  if (data.statusCode === 409) {
                    notification.error(t("messages:error.update_help_widget"));
                  }
                }
              });
            },
            catchError((err) => {
              message.loading.hide().then(() => {
                notification.error(t("messages:error.update_help_widget"));
              });
              return of(err);
            })
          )
        );
    },
    { showLoading: false }
  );

  const onChange = (key: string) => {};
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
      <div className="flex gap-2">
        <MDButton onClick={handleCancel}>Cancel</MDButton>

        <MDButton type="primary" onClick={handleSaveWidget}>
          Save
        </MDButton>
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
            {/* <FooterButton /> */}
          </>
        ),
      },
      {
        label: `Appearance`,
        key: "2",
        children: (
          <>
            <Appearance />
            {/* <FooterButton /> */}
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
      <Header
        title="Web Form"
        back
        className="xs:h-[32px] md:h-[40px]  mb-5   "
      >
        <div className="flex flex-1 justify-end items-center">
          <FooterButton />
        </div>
      </Header>
      {loadingList ? (
        <>
          <Skeleton />
        </>
      ) : (
        <Card>
          <Tabs onChange={onChange} items={items} defaultActiveKey={"1"} />
        </Card>
      )}
    </>
  );
};

export default WidgetDetail;
