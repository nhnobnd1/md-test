import {
  PageComponent,
  useDebounceFn,
  useJob,
  usePrevious,
  useToggle,
} from "@moose-desk/core";
import {
  BaseListTagRequest,
  BaseMetaDataListResponse,
  GetListTagRequest,
  Tag,
  TagRepository,
} from "@moose-desk/repo";
import { Input, TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import dayjs from "dayjs";
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
import PopupTag from "src/modules/setting/component/PopupTag";
import { TagFormValues } from "src/modules/setting/component/TagForm";

interface TagIndexPageProps {}

const TagIndexPage: PageComponent<TagIndexPageProps> = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const message = useMessage();
  const notification = useNotification();
  const { state: popupTag, on: openPopupTag, off: closePopupTag } = useToggle();
  const [dataPopup, setDataPopup] = useState<TagFormValues | undefined>({
    name: "",
    description: "",
  });
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
              message.error("Get data tag failed");
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
    message.loading.show("Removing tag...");
    return TagRepository()
      .delete({
        ids: id,
      })
      .pipe(
        map(({ data }) => {
          message.loading.hide();
          if (data.statusCode === 200) {
            notification.success(
              "The selected tag has been removed from the system."
            );
            getListTagApi({
              page: 1,
              limit: env.DEFAULT_PAGE_SIZE,
            });
          } else {
            notification.error("There is an error with remove tag.", {
              description: "Remove tag failed",
              style: {
                width: 450,
              },
            });
          }
        }),
        catchError((err) => {
          notification.error("There is an error with remove tag.", {
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
    deleteTagApi([tag._id]);
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
      <Header title="Manage tags">
        <div className="flex-1 flex justify-end">
          <ButtonAdd
            onClick={() => {
              openPopupTag();
              setDataPopup(undefined);
            }}
          >
            Add new tag
          </ButtonAdd>
        </div>
      </Header>
      <div className="pb-2">
        <Input.Search
          placeholder="Search"
          className="mr-2"
          onSearch={handleChangeValueInput}
          allowClear
          enterButton
        />
      </div>
      <div>
        {tags && (
          <>
            <Table
              dataSource={tags}
              loading={loadingList}
              onChange={onChangeTable}
            >
              <Table.Column
                key="name"
                title="Name"
                render={(_, record: Tag) => <span>{`${record.name}`}</span>}
                sorter={{
                  compare: (a: any, b: any) => a.name - b.name,
                }}
              />
              <Table.Column
                key="numberOfTicket"
                title="Number of tickets"
                dataIndex="storeId"
              ></Table.Column>
              <Table.Column
                key="lastUpdate"
                title="Last updated"
                render={(_, record: Tag) => (
                  <span>
                    {record.updatedDatetime
                      ? dayjs(record.updatedDatetime).format("DD-MM-YYYY")
                      : dayjs(record.createdDatetime).format("DD-MM-YYYY")}
                  </span>
                )}
              ></Table.Column>
              <Table.Column
                align="center"
                title="Action"
                render={(_, record: Tag) => (
                  <TableAction
                    record={record}
                    edit
                    showDelete
                    onlyIcon
                    onEdit={handleEdit}
                    onDelete={handleDeleteTag}
                  />
                )}
              />
            </Table>
            {meta && (
              <Pagination
                className="mt-4 flex justify-end"
                currentPage={filterData.page ?? 1}
                total={meta?.totalCount}
                pageSize={filterData.limit ?? env.DEFAULT_PAGE_SIZE}
                onChange={onPagination}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TagIndexPage;
