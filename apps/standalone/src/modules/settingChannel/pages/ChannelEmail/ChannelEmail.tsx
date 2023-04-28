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
import { Button, Input, Space, TableProps, Tooltip } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useCallback, useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import { Header } from "src/components/UI/Header";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";

interface ChannelEmailProps {}

const ChannelEmail = (props: ChannelEmailProps) => {
  const navigate = useNavigate();
  const message = useMessage();
  const notification = useNotification();

  const defaultFilter: () => any = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });

  const [emails, setEmails] = useState<EmailIntegration[]>([]);

  const [filterData, setFilterData] =
    useState<GetListEmailRequest>(defaultFilter);

  const [meta, setMeta] = useState<BaseMetaDataListResponse>();

  const prevFilter = usePrevious<any>(filterData);

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
              setEmails(listEmails);
              setMeta(data.metadata);
            } else {
              message.error("Get data agent failed");
            }
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
  const resetFilterData = useCallback(() => {
    setFilterData(defaultFilter());
  }, []);

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

  useEffect(() => {
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
      message.loading.show("Deleting the email");
      return EmailIntegrationRepository()
        .deleteEmailIntegration(id)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              message.loading.hide().then(() => {
                notification.success("Delete email successfully");
                getListEmailApi(filterData);
              });
            } else {
              message.loading.hide().then(() => {
                notification.error("Delete email failed");
              });
            }
          }),
          catchError((err) => {
            message.loading.hide().then(() => {
              notification.error("Delete email failed");
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

  return (
    <>
      <Header title="Email Configuration">
        <div className="flex-1 flex justify-end">
          <ButtonAdd
            onClick={() => {
              navigate(
                generatePath(SettingChannelRoutePaths.ChannelEmail.Create)
              );
            }}
          >
            Add new Email Address
          </ButtonAdd>
        </div>
      </Header>
      <div className="search mb-6">
        <Input.Search
          placeholder="Search"
          enterButton
          allowClear
          onSearch={(searchText: string) => {
            setFilterData((value: any) => {
              return {
                ...value,
                query: searchText,
                page: 1,
              };
            });
          }}
        />
      </div>
      <div>
        <>
          <Table
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
            <Pagination
              className="mt-4 flex justify-end"
              currentPage={filterData.page ?? 1}
              total={meta?.totalCount}
              pageSize={filterData.limit ?? env.DEFAULT_PAGE_SIZE}
              onChange={onPagination}
            />
          )}
        </>
      </div>
    </>
  );
};

export default ChannelEmail;
