import { HelpWidget } from "@moose-desk/repo";
import { Card, Tabs } from "antd";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { MDButton } from "src/components/UI/Button/MDButton";
import { Header } from "src/components/UI/Header";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import Appearance from "src/modules/settingChannel/components/Widgets/Appearance/Appearance";
import General from "src/modules/settingChannel/components/Widgets/General/General";
import Setup from "src/modules/settingChannel/components/Widgets/Setup/Setup";
import {
  getListHelpWidget,
  updateHelpWidget,
} from "src/modules/settingChannel/helper/api";
import useUpdateSave from "src/modules/settingChannel/store/saveUpdateWidget";
import useWidgetSetting, {
  initialDefaultWidget,
} from "src/modules/settingChannel/store/useSetting";

const WidgetDetail = () => {
  const message = useMessage();
  const notification = useNotification();
  const {
    data: helpWidgetData,
    isLoading: loadingList,
    refetch,
  } = useQuery({
    queryKey: ["getListHelpWidget"],
    queryFn: () => getListHelpWidget(),
    retry: 1,

    onError: () => {
      message.error("Something went wrong!");
    },
    initialData: undefined,
  });

  const widget = useMemo(() => {
    if (helpWidgetData) return helpWidgetData;
    return undefined;
  }, [helpWidgetData]);
  const { t } = useTranslation();

  const updateWidgetMutation = useMutation({
    mutationFn: ({ id, object }: any) => updateHelpWidget(id, object),

    onSuccess: (data: HelpWidget) => {
      updateWidgetSetting(data.settings);
      notification.success(t("messages:success.update_help_widget"));
      refetch();
    },
    onError: (e) => {
      notification.error(t("messages:error.update_help_widget"));
    },
    onSettled: () => {
      message.loading.hide();
    },
  });

  const widgetSetting = useWidgetSetting((state) => state.widgetSetting);
  const updateSave = useUpdateSave((state) => state.changeUpdate);
  const updateCancel = useUpdateSave((state) => state.changeCancel);
  const updateWidgetSetting = useWidgetSetting(
    (state) => state.updateWidgetSetting
  );

  const onChange = (key: string) => {};
  const handleCancel = () => {
    updateWidgetSetting(widget?.settings);
    updateCancel(new Date());
  };

  const handleSaveWidget = () => {
    message.loading.show(t("messages:loading.updating_widget"));

    updateWidgetMutation.mutate({
      id: widget?._id,
      object: { name: widget?.name, settings: widgetSetting },
    });
    updateSave(new Date());
  };
  useEffect(() => {
    return () => {
      updateWidgetSetting(initialDefaultWidget);
    };
  }, []);

  useEffect(() => {
    updateWidgetSetting({
      ...helpWidgetData?.settings,
      id: helpWidgetData?._id,
    });
  }, [helpWidgetData, updateWidgetSetting]);

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
          </>
        ),
      },
      {
        label: `Appearance`,
        key: "2",
        children: (
          <>
            <Appearance />
          </>
        ),
      },
      {
        label: `Setup`,
        key: "3",
        children: <Setup />,
      },
      // {
      //   label: `Integration`,
      //   key: "3",
      //   children: <Integration idWidget={null} />,
      // },
    ];
  }, [widget, widgetSetting]);

  return (
    <>
      <Header title="Help Widget" className="xs:h-[32px] md:h-[40px]  mb-5   ">
        <div className="flex flex-1 justify-end items-center">
          <FooterButton />
        </div>
      </Header>
      {loadingList ? (
        <>
          <MDSkeleton lines={20} />
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
