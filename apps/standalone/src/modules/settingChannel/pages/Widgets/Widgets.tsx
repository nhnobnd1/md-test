import { generatePath, useJob, useNavigate } from "@moose-desk/core";
import {
  BaseListHelpWidgetRequest,
  GetListHelpWidgetRequest,
  HelpWidget,
  HelpWidgetRepository,
} from "@moose-desk/repo";
import { Button, Input, List, Modal } from "antd";
import { useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";

import { DeleteOutlined } from "@ant-design/icons";
import VirtualList from "rc-virtual-list";
import { Header } from "src/components/UI/Header";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import Integration from "src/modules/settingChannel/components/Widgets/Integration/Integration";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";
import { initialDefaultWidget } from "src/modules/settingChannel/store/useSetting";
import CodeIcon from "~icons/carbon/code";
import HeadPhoneIcon from "~icons/fa6-solid/headphones";

const Widgets = () => {
  const ContainerHeight = 400;
  const navigate = useNavigate();
  const [helpwidgets, setHelpWidgets] = useState<HelpWidget[]>([]);
  const [widgetName, setWidgetName] = useState<string>("");
  const message = useMessage();
  const notification = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState<string>("");

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
      <Header title="Widgets"></Header>
      <p style={{ color: "#6f7c87" }}>
        With the help widget, your customers can get help from anywhere and ask
        questions via a contact form.
      </p>
      <div className="flex justify-start">
        <Button type="primary" className="mt-2" onClick={showModal}>
          Create a new ticket
        </Button>
      </div>
      <List loading={loadingList} className="mt-10">
        <VirtualList
          data={helpwidgets}
          height={ContainerHeight}
          itemHeight={47}
          itemKey="widgets"
          onScroll={onScroll}
        >
          {(item: HelpWidget) => (
            <List.Item key={item._id} onClick={() => handleNavigate(item._id)}>
              <div className="flex  justify-between items-center w-full p-4 flex-wrap hover:bg-slate-300 hover:cursor-pointer rounded-md group">
                <div className="flex items-center max-w-full flex-1  grow-[7]">
                  <HeadPhoneIcon fontSize={20} className="flex-shrink-0" />
                  <div className="ml-5 whitespace-nowrap overflow-hidden truncate ">
                    {item.name}
                  </div>
                </div>
                <div className="flex invisible group-hover:visible w-full justify-end flex-1 grow-[3]">
                  <Button
                    size="middle"
                    className="w-20 mr-5"
                    onClick={(event) => {
                      handleEmbedWidget(event, item._id);
                    }}
                  >
                    <CodeIcon />
                  </Button>
                  <Button
                    size="middle"
                    className="w-20"
                    onClick={(event) => {
                      handleDelete(event, item._id);
                    }}
                  >
                    <DeleteOutlined />
                  </Button>
                </div>
              </div>
            </List.Item>
          )}
        </VirtualList>
      </List>
      <Modal
        title="New widget"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="mt-2 mb-10">
          <span style={{ fontSize: 12 }}>Give a name for the widget</span>
          <Input
            className="mt-1"
            onChange={(e) => {
              setWidgetName(e.target.value);
            }}
            placeholder="e.g. Widget for the pricing page"
          />
        </div>
      </Modal>

      <Modal
        title="Delete widget"
        open={isModalDeleteOpen}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        okButtonProps={{ danger: true }}
      >
        <div className="mt-2 mb-10">
          <span style={{ fontSize: 12 }}>
            Are you sure you want to delete this widget?
          </span>
        </div>
      </Modal>

      <Modal
        title="Embed widget"
        open={isModalEmbedOpen}
        onOk={handleOkEmbed}
        onCancel={() => {
          setIsModalEmbedOpen(false);
        }}
        footer={<></>}
        // okButtonProps={{ danger: true }}
      >
        <div className="mt-2 mb-10">
          <span style={{ fontSize: 12 }}>
            You can embed the widget in your website or product using the code
            below.
          </span>
          <div className="mt-10">
            <Integration idWidget={idDelete} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Widgets;
