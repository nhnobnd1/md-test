import {
  PageComponent,
  createdDatetimeFormat,
  generatePath,
  useDebounceFn,
  useJob,
  useNavigate,
  usePrevious,
  useToggle,
} from "@moose-desk/core";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import {
  BaseListTagRequest,
  BaseMetaDataListResponse,
  GetListTagRequest,
  Tag,
  TagRepository,
} from "@moose-desk/repo";
import { TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
import PopupTag from "src/modules/setting/component/PopupTag";
import { TagFormValues } from "src/modules/setting/component/TagForm";
import SettingRoutePaths from "src/modules/setting/routes/paths";
import "./TagStyle.scss";

interface TagIndexPageProps {}

const TagIndexPage: PageComponent<TagIndexPageProps> = () => {
  const [tags, setTags] = useState<Tag[]>([]);
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
  const defaultFilter: () => GetListTagRequest = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
    query: "",
    sortBy: undefined,
    sortOrder: undefined,
  });

  const [filterData, setFilterData] =
    useState<BaseListTagRequest>(defaultFilter);

  const handleChangeValueInput = useCallback((value: string) => {
    setFilterData(() => ({
      page: 1,
      ...filterData,
      query: value,
    }));
  }, []);
  const [meta, setMeta] = useState<BaseMetaDataListResponse>();
  const { t } = useTranslation();

  const prevFilter = usePrevious<GetListTagRequest>(filterData);

  const { run: getListTagApi, processing: loadingList } = useJob(
    (payload: GetListTagRequest) => {
      return TagRepository()
        .getList(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              const listTag = data.data.map((item) => ({
                ...item,
                id: item._id,
              }));
              setTags(listTag);
              setMeta(data.metadata);
            } else {
              message.error(t("messages:error.get_tag"));
            }
          })
        );
    }
  );

  const { run: getListDebounce } = useDebounceFn(
    (payload: GetListTagRequest) => {
      getListTagApi(payload);
    },
    { wait: 300 }
  );

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
    getListTagApi(filterData);
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
            getListTagApi({
              page: 1,
              limit: env.DEFAULT_PAGE_SIZE,
            });
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
  useEffect(() => {
    if (prevFilter?.query !== filterData.query && filterData.query) {
      getListDebounce(filterData);
    } else {
      getListTagApi(filterData);
    }
  }, [filterData]);

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
      <Header title={showTitle ? "Tags" : ""}>
        <div className="flex-1 flex justify-end mb-5">
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
              Add new tag
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
                  <Pagination
                    className="mt-4 flex justify-end"
                    currentPage={filterData.page ?? 1}
                    total={meta?.totalCount}
                    pageSize={filterData.limit ?? env.DEFAULT_PAGE_SIZE}
                    onChange={onPagination}
                  />
                )
              : null}
          </>
        )}
      </div>
    </div>
  );
};

export default TagIndexPage;
