import { generatePath, useJob, useNavigate } from "@moose-desk/core";
import {
  BaseListHelpWidgetRequest,
  GetListHelpWidgetRequest,
  HelpWidget,
  HelpWidgetRepository,
} from "@moose-desk/repo";
import { useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";

import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import WidgetDetail from "src/modules/settingChannel/pages/Widgets/WidgetDetail";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";
import useWidgetSetting, {
  initialDefaultWidget,
} from "src/modules/settingChannel/store/useSetting";

const Widgets = () => {
  const ContainerHeight = 400;
  const navigate = useNavigate();
  const [helpwidgets, setHelpWidgets] = useState<HelpWidget[]>([]);
  const [widgetName, setWidgetName] = useState<string>("");
  const message = useMessage();
  const notification = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState<string>("");
  const updateWidgetSetting = useWidgetSetting(
    (state) => state.updateWidgetSetting
  );
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEmbedOpen, setIsModalEmbedOpen] = useState(false);
  const defaultFilter: () => GetListHelpWidgetRequest = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
    query: "",
    sortBy: undefined,
    sortOrder: undefined,
  });

  const [filterData, setFilterData] =
    useState<BaseListHelpWidgetRequest>(defaultFilter);
  const { run: getListHelpWidgetApi, processing: loadingList } = useJob(
    (payload: GetListHelpWidgetRequest) => {
      return HelpWidgetRepository()
        .getList(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              setHelpWidgets(
                data.data.sort(
                  (a: HelpWidget, b: HelpWidget) =>
                    b.createdTimestamp - a.createdTimestamp
                )
              );
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

  const { run: createHelpWidget } = useJob(
    (dataSubmit: any) => {
      message.loading.show("Creating Widget!");
      return HelpWidgetRepository()
        .create(dataSubmit)
        .pipe(
          map(({ data }) => {
            message.loading.hide();
            if (data.statusCode === 200) {
              notification.success("Widget has been created successfully.");
              navigate(
                generatePath(SettingChannelRoutePaths.Widgets.Update, {
                  id: data.data._id,
                })
              );
            } else {
              if (data.statusCode === 409) {
                notification.error(`Error`);
              }
            }
          }),
          catchError((err) => {
            message.loading.hide();
            const errorCode = err.response.status;
            if (errorCode === 409) {
              notification.error(`Error`);
            } else {
              notification.error("Widget  has been created failed.");
            }
            return of(err);
          })
        );
    },
    { showLoading: false }
  );

  const { run: deleteHelpWidgetApi } = useJob((id: string) => {
    message.loading.show("Deleting widget");
    return HelpWidgetRepository()
      .delete(id)
      .pipe(
        map(({ data }) => {
          message.loading.hide();
          if (data.statusCode === 200) {
            notification.success("Widget have been removed successfully!");
            getListHelpWidgetApi(filterData);
          } else {
            notification.error("There is an error with remove Widget", {
              description: "Remove Widget failed",
              style: {
                width: 450,
              },
            });
          }
        }),
        catchError((err) => {
          notification.error("There is an error with remove Widget", {
            description: "Remove Widget failed",
            style: {
              width: 450,
            },
          });
          return of(err);
        })
      );
  });

  useEffect(() => {
    getListHelpWidgetApi(filterData);
  }, []);
  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      // getListHelpWidgetApi(filterData);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (event: any) => {
    createHelpWidget({
      name: widgetName,
      settings: initialDefaultWidget,
    });
    setIsModalOpen(false);
  };

  const handleOkDelete = () => {
    deleteHelpWidgetApi(idDelete);
    setIsModalDeleteOpen(false);
  };

  const handleOkEmbed = () => {
    setIsModalEmbedOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalDeleteOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleNavigate = (id: string) => {
    console.log("navigate", id);
    navigate(
      generatePath(SettingChannelRoutePaths.Widgets.Update, {
        id: id,
      })
    );
  };

  const handleDelete = (event: any, id: string) => {
    event.stopPropagation();
    console.log("delete", id);
    setIdDelete(id);
    setIsModalDeleteOpen(true);
  };

  const handleEmbedWidget = (event: any, id: string) => {
    event.stopPropagation();
    setIdDelete(id);

    setIsModalEmbedOpen(true);
  };
  return (
    <>
      <WidgetDetail widgetProps={helpwidgets[0]} />
    </>
  );
};

export default Widgets;
