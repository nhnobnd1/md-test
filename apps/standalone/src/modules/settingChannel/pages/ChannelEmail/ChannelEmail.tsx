import { DeleteOutlined } from "@ant-design/icons";
import {
  generatePath,
  useDebounceFn,
  useJob,
  useNavigate,
  usePrevious,
} from "@moose-desk/core";
import {
  BaseMetaDataListResponse,
  EmailIntegration,
  EmailIntegrationRepository,
  GetListEmailRequest,
} from "@moose-desk/repo";
import { Button, Space, TableProps, Tooltip } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { HeaderList } from "src/components/HeaderList";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import { Header } from "src/components/UI/Header";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import env from "src/core/env";
import useDeepEffect from "src/hooks/useDeepEffect";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";
import useMailSetting from "src/modules/settingChannel/store/useMailSetting";
import { defaultFilter } from "src/utils/localValue";

const ChannelEmail = () => {
  const navigate = useNavigate();
  const message = useMessage();
  const notification = useNotification();
  const { t } = useTranslation();
  const [emails, setEmails] = useState<EmailIntegration[]>([]);
  const changeUpdateMooseDeskEmail = useMailSetting(
    (state) => state.changeUpdateMooseDeskEmail
  );
  const [filterData, setFilterData] =
    useState<GetListEmailRequest>(defaultFilter);
  const [showTitle, setShowTitle] = useState(true);

  const [meta, setMeta] = useState<BaseMetaDataListResponse>();

  const prevFilter = usePrevious<any>(filterData);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    updateEmailIntegration(
      { isPrimaryEmail: true },
      newSelectedRowKeys[0] as string
    );
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    preserveSelectedRowKeys: true,
  };
  const { run: updateEmailIntegration } = useJob((payload: any, id: string) => {
    message.loading.show(t("messages:loading.updating_email"));

    return EmailIntegrationRepository()
      .primaryEmail(id, payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            message.loading.hide().then(() => {
              notification.success(t("messages:success.update_email"));
            });
            getListEmailApi(filterData);
          } else {
            message.loading.hide().then(() => {
              message.loading.hide().then(() => {
                notification.error(t("messages:error.update_email"));
              });
            });
          }
        }),
        catchError((err) => {
          if (err.response.data.statusCode === 409) {
            message.loading.hide().then(() => {
              notification.error(`${payload.supportEmail} is exist`);
            });
          }
          message.loading.hide().then(() => {
            notification.error(t("messages:error.something_went_wrong"));
          });
          return of(err);
        })
      );
  });

  const { run: getListEmailApi, processing: loadingList } = useJob(
    (payload: any) => {
      return EmailIntegrationRepository()
        .getListEmail(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              const listEmails = data.data.map((item) => ({
                ...item,
                id: item._id,
              }));
              const findPrimaryEmail = listEmails.find(
                (item) => item.isPrimaryEmail === true
              );

              setSelectedRowKeys([findPrimaryEmail?._id as React.Key]);

              setEmails(listEmails);
              setMeta(data.metadata);
              changeUpdateMooseDeskEmail(
                (data.metadata as any)?.moosedeskEmailExists
              );
            } else {
              message.error(t("messages:error.get_agent"));
            }
          }),
          catchError((err) => {
            message.error(t("messages:error.something_went_wrong"));
            return of(err);
          })
        );
    }
  );

  const { run: getListDebounce } = useDebounceFn(
    (payload: GetListEmailRequest) => {
      getListEmailApi(payload);
    },
    { wait: 300 }
  );

  const onPagination = useCallback(
    ({ page, limit }: { page: number; limit: number }) => {
      setFilterData((value) => {
        return {
          ...value,
          page,
          limit,
        };
      });
    },
    []
  );

  useDeepEffect(() => {
    if (prevFilter?.query !== filterData.query && filterData.query) {
      getListDebounce(filterData);
    } else {
      getListEmailApi(filterData);
    }
  }, [filterData]);

  const onChangeTable = useCallback(
    (pagination: any, filters: any, sorter: SorterResult<EmailIntegration>) => {
      if (sorter.order && sorter.columnKey) {
        setFilterData((value) => ({
          ...value,
          sortBy: sorter.columnKey as string,
          sortOrder: sorter.order === "ascend" ? 1 : -1,
        }));
      } else {
        setFilterData((value) => ({
          ...value,
          sortBy: undefined,
          sortOrder: undefined,
        }));
      }
    },
    [setFilterData]
  ) as TableProps<EmailIntegration>["onChange"];

  const { run: deleteEmailApi } = useJob(
    (id: string) => {
      message.loading.show(t("messages:loading.deleting_email"));

      return EmailIntegrationRepository()
        .deleteEmailIntegration(id)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              message.loading.hide().then(() => {
                notification.success(t("messages:success.delete_email"));
                getListEmailApi(filterData);
              });
            } else {
              message.loading.hide().then(() => {
                notification.error(t("messages:error.delete_email"));
              });
            }
          }),
          catchError((err) => {
            message.loading.hide().then(() => {
              notification.error(t("messages:error.delete_email"));
            });
            return of(err);
          })
        );
    },
    { showLoading: true }
  );

  const handleDeleteEmail = useCallback((id: string) => {
    deleteEmailApi(id);
  }, []);
  const handleRedirectToCreate = () => {
    navigate(generatePath(SettingChannelRoutePaths.ChannelEmail.Create));
  };
  const handleSearch = (searchText: string) => {
    setFilterData((value: any) => {
      return {
        ...value,
        query: searchText,
        page: 1,
      };
    });
  };
  const css = `.ant-table-selection-column,
.ant-table-cell {
  background-color: white !important;
}
`;
  return (
    <>
      <style scoped>{css}</style>
      <Header
        title={showTitle ? "Email Configuration" : ""}
        back
        backAction={() => navigate("/setting-channel")}
      >
        <div className="flex items-center justify-end flex-1 ">
          <HeaderList setShowTitle={setShowTitle} handleSearch={handleSearch}>
            <ButtonAdd onClick={handleRedirectToCreate}>Add new</ButtonAdd>
          </HeaderList>
        </div>
      </Header>

      <div className="mt-5">
        <>
          <Table
            rowSelection={{
              type: "radio",
              columnTitle: "Primary",
              columnWidth: 70,

              ...rowSelection,
            }}
            dataSource={emails}
            loading={loadingList}
            onChange={onChangeTable}
          >
            <Table.Column
              key="name"
              title="Name"
              render={(_, record: EmailIntegration) => (
                <span>{record.name}</span>
              )}
              sorter={{
                compare: (a: any, b: any) => a.name - b.name,
              }}
            />
            <Table.Column
              key="supportEmail"
              title="Email Address"
              dataIndex="supportEmail"
              sorter={{
                compare: (a: any, b: any) => a.supportEmail - b.supportEmail,
              }}
              render={(_, record: EmailIntegration) => (
                <div className="flex flex-col">
                  <span>{record.supportEmail}</span>
                  <span
                    style={{ color: "red" }}
                    className={record?.isLive === false ? "block" : "hidden"}
                  >
                    Unable to access your mailbox
                  </span>
                  <span
                    style={{ color: "red" }}
                    className={
                      record?.senderVerified === false ? "block" : "hidden"
                    }
                  >
                    The sender is not verified
                  </span>
                </div>
              )}
            ></Table.Column>

            <Table.Column
              align="center"
              title="Action"
              render={(_, record: EmailIntegration) => (
                <Space>
                  <TableAction
                    record={record}
                    edit
                    onlyIcon
                    onEdit={() => {
                      navigate(
                        generatePath(
                          SettingChannelRoutePaths.ChannelEmail.Update,
                          { id: record._id }
                        )
                      );
                    }}
                    specialDelete={
                      !record.isPrimaryEmail
                        ? {
                            title:
                              "Are you sure that you want to permanently remove this email connection.",
                            description:
                              "This email will be removed permanently. You can no longer use this email for sending or receiving emails for MooseDesk's support tickets",
                            okeText: "Remove",
                          }
                        : undefined
                    }
                    onSpecialDelete={() => handleDeleteEmail(record._id)}
                  />
                  {record.isPrimaryEmail && (
                    <Tooltip
                      placement="top"
                      title={
                        <p className="text-center">
                          This is your primary email and cannot be deleted.
                        </p>
                      }
                      arrowContent
                    >
                      <Button
                        danger
                        type="primary"
                        disabled
                        icon={<DeleteOutlined />}
                      ></Button>
                    </Tooltip>
                  )}
                </Space>
              )}
            />
          </Table>
          {meta && emails?.length > 0 && (
            <div className="flex justify-end items-end bg-white rounded-br-md rounded-bl-md pb-2 pr-4">
              <Pagination
                className="mt-2 flex justify-end"
                currentPage={filterData.page ?? 1}
                total={meta?.totalCount}
                pageSize={filterData.limit ?? env.DEFAULT_PAGE_SIZE}
                onChange={onPagination}
              />
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default ChannelEmail;
