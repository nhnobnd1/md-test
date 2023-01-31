import {
  PageComponent,
  useDebounceFn,
  useJob,
  useNavigate,
  usePrevious,
} from "@moose-desk/core";
import {
  Agent,
  BaseMetaDataListResponse,
  GetListUserGroupRequest,
  UserGroup,
  UserGroupRepository,
} from "@moose-desk/repo";
import { Input, TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useCallback, useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import { Header } from "src/components/UI/Header";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";

interface GroupIndexPageProps {}

const GroupIndexPage: PageComponent<GroupIndexPageProps> = () => {
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const navigate = useNavigate();
  const message = useMessage();

  const defaultFilter: () => GetListUserGroupRequest = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });

  const [filterData, setFilterData] =
    useState<GetListUserGroupRequest>(defaultFilter);
  const [meta, setMeta] = useState<BaseMetaDataListResponse>();

  const prevFilter = usePrevious<GetListUserGroupRequest>(filterData);

  const { run: getListGroup, processing: loadingList } = useJob(
    (payload: GetListUserGroupRequest) => {
      return UserGroupRepository()
        .getList(payload)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                const listGroup = data.data.map((item) => ({
                  ...item,
                  id: item._id,
                }));
                setGroups(listGroup);
                setMeta(data.metadata);
              } else {
                message.error("Get data agent failed");
              }
            },
            catchError((err) => {
              message.error("Get data agent failed");
              return of(err);
            })
          )
        );
    }
  );

  const { run: getListGroupDebounce } = useDebounceFn(
    (payload: GetListUserGroupRequest) => {
      getListGroup(payload);
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

  const onChangeTable = useCallback(
    (pagination: any, filters: any, sorter: SorterResult<UserGroup>) => {
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
  ) as TableProps<Agent>["onChange"];

  useEffect(() => {
    if (prevFilter?.query !== filterData.query && filterData.query) {
      getListGroupDebounce(filterData);
    } else {
      getListGroup(filterData);
    }
  }, [filterData]);

  return (
    <div>
      <Header title="Group">
        <div className="flex-1 flex justify-end">
          <ButtonAdd onClick={() => {}}>Add Group</ButtonAdd>
        </div>
      </Header>
      <div className="search mb-6">
        <Input.Search
          placeholder="Search"
          enterButton
          onSearch={(searchText: string) => {
            setFilterData((value) => {
              return {
                ...value,
                query: searchText,
                page: 1,
              };
            });
          }}
        />
      </div>
    </div>
  );
};

export default GroupIndexPage;
