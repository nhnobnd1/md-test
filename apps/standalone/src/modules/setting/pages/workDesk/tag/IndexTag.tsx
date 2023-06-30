import {
  PageComponent,
  createdDatetimeFormat,
  generatePath,
  useJob,
  useNavigate,
  useToggle,
} from "@moose-desk/core";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { BaseListTagRequest, Tag, TagRepository } from "@moose-desk/repo";
import { TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { catchError, map, of } from "rxjs";
import { HeaderList } from "src/components/HeaderList";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import { Header } from "src/components/UI/Header";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { usePermission } from "src/hooks/usePerrmisson";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getListTagFilter } from "src/modules/setting/api/api";
import PopupTag from "src/modules/setting/component/PopupTag";
import { TagFormValues } from "src/modules/setting/component/TagForm";
import SettingRoutePaths from "src/modules/setting/routes/paths";
import { defaultFilter } from "src/utils/localValue";
import "./TagStyle.scss";

interface TagIndexPageProps {}

const TagIndexPage: PageComponent<TagIndexPageProps> = () => {
  const message = useMessage();
  const notification = useNotification();
  const { state: popupTag, on: openPopupTag, off: closePopupTag } = useToggle();
  const navigate = useNavigate();
  const { isAgent } = usePermission();

  const [dataPopup, setDataPopup] = useState<TagFormValues | undefined>({
    name: "",
    description: "",
  });
  const [showTitle, setShowTitle] = useState(true);

  const { subDomain } = useSubdomain();
  const { timezone } = useGlobalData(false, subDomain || "");

  const [filterData, setFilterData] =
    useState<BaseListTagRequest>(defaultFilter);

  const handleChangeValueInput = useCallback((value: string) => {
    setFilterData(() => ({
      page: 1,
      ...filterData,
      query: value,
    }));
  }, []);
  const { t } = useTranslation();

  const {
    data: dataTag,
    isLoading: loadingList,
    refetch,
  } = useQuery({
    queryKey: ["getTags", filterData],
    queryFn: () => getListTagFilter(filterData),
    retry: 1,

    onError: () => {
      message.error(t("messages:error.get_tag"));
    },
  });
  const tags = useMemo(() => {
    if (!dataTag?.data) return [];
    return dataTag.data;
  }, [dataTag?.data]);
  const meta = useMemo(() => {
    if (!dataTag?.metadata)
      return { page: 0, totalPage: 0, totalCount: 0, resultsPerPage: 0 };
    return dataTag.metadata;
  }, [dataTag?.metadata]);

  const handleEdit = (record: Tag) => {
    setDataPopup(record);
    openPopupTag();
  };

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

  const handleChangePopup = useCallback(() => {
    refetch();
    closePopupTag();
  }, []);
  const { run: deleteTagApi } = useJob((id: string[]) => {
    message.loading.show(t("messages:loading.removing_tag"));

    return TagRepository()
      .delete({
        names: id,
      })
      .pipe(
        map(({ data }) => {
          message.loading.hide();
          if (data.statusCode === 200) {
            notification.success(t("messages:success.delete_tag"));

            refetch();
          } else {
            notification.error(t("messages:error.delete_tag"), {
              description: "Remove tag failed",
              style: {
                width: 450,
              },
            });
          }
        }),
        catchError((err) => {
          notification.error(t("messages:error.delete_tag"), {
            description: "Remove tag failed",
            style: {
              width: 450,
            },
          });
          return of(err);
        })
      );
  });

  const handleDeleteTag = useCallback((tag: Tag) => {
    deleteTagApi([tag.name]);
  }, []);

  const onChangeTable = useCallback(
    (pagination: any, filters: any, sorter: SorterResult<Tag>) => {
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
  ) as TableProps<Tag>["onChange"];
  return (
    <div>
      <PopupTag
        open={popupTag}
        dataForm={dataPopup as Tag}
        onCancel={closePopupTag}
        onChange={handleChangePopup}
      />
      <Header title={showTitle ? "Tags" : ""} className="mb-5">
        <div className="flex-1 flex justify-end ">
          <HeaderList
            setShowTitle={setShowTitle}
            handleSearch={handleChangeValueInput}
          >
            <ButtonAdd
              onClick={() => {
                openPopupTag();
                setDataPopup(undefined);
              }}
            >
              Add new
            </ButtonAdd>
          </HeaderList>
        </div>
      </Header>

      <div>
        {tags && (
          <>
            <Table
              dataSource={tags}
              loading={loadingList}
              onChange={onChangeTable}
              scroll={{ x: 1024 }}
            >
              <Table.Column
                key="name"
                title="Name"
                render={(_, record: Tag) => (
                  <span
                    className="cursor-pointer hover:underline hover:text-blue-500 name-tag"
                    onClick={() => {
                      navigate(
                        generatePath(
                          SettingRoutePaths.Workdesk.Tag.DetailViewTicket,
                          {
                            id: record.name,
                          }
                        )
                      );
                    }}
                  >
                    {`${record.name}`}
                  </span>
                )}
                sorter={{
                  compare: (a: any, b: any) => a.name - b.name,
                }}
              />
              <Table.Column
                key="ticketsCount"
                title="# of tickets"
                // dataIndex="storeId"
                render={(_, record: any) => (
                  <span
                    className="cursor-pointer hover:underline hover:text-blue-500 "
                    onClick={() => {
                      navigate(
                        generatePath(
                          SettingRoutePaths.Workdesk.Tag.DetailViewTicket,
                          {
                            id: record.name,
                          }
                        )
                      );
                    }}
                  >{`${record.ticketsCount}`}</span>
                )}
                sorter={{
                  compare: (a: any, b: any) =>
                    a.numberOfTicket - b.numberOfTicket,
                }}
              ></Table.Column>
              <Table.Column
                key="updatedTimestamp"
                title="Last updated"
                render={(_, record: Tag) => (
                  <span>
                    {createdDatetimeFormat(record.updatedDatetime, timezone)}
                  </span>
                )}
                sorter={{
                  compare: (a: any, b: any) => a.lastUpdate - b.lastUpdate,
                }}
              ></Table.Column>
              <Table.Column
                align="center"
                title="Action"
                render={(_, record: Tag) => (
                  <TableAction
                    record={record}
                    edit
                    onEdit={handleEdit}
                    specialDelete={
                      !isAgent
                        ? {
                            title:
                              "Are you sure that you want to permanently remove this Tag?",
                            description:
                              "This Tag will be removed permanently. This action can not be undone. All tickets which are using this tag will get affected too.",
                            textDelete: "Remove",
                          }
                        : null
                    }
                    onSpecialDelete={handleDeleteTag}
                    onlyIcon
                  />
                )}
              />
            </Table>
            {meta?.totalCount
              ? meta && (
                  <div className="flex justify-end items-end bg-white rounded-br-md rounded-bl-md pb-4 pr-4">
                    <Pagination
                      className="mt-4 flex justify-end"
                      currentPage={filterData.page ?? 1}
                      total={meta?.totalCount}
                      pageSize={filterData.limit ?? env.DEFAULT_PAGE_SIZE}
                      onChange={onPagination}
                    />
                  </div>
                )
              : null}
          </>
        )}
      </div>
    </div>
  );
};

export default TagIndexPage;
