import { useDebounceFn, useJob, usePrevious } from "@moose-desk/core";
import {
  AgentRepository,
  BaseMetaDataListResponse,
  GetMembersGroupRequest,
  GroupMembers,
  UserGroupRepository,
} from "@moose-desk/repo";
import { useCallback, useEffect, useMemo, useState } from "react";
import { map } from "rxjs";
import Select, { LoadMoreValue } from "src/components/UI/Select/Select";
import env from "src/core/env";

interface GroupFormMemberProps {
  id?: string;
  value?: GroupMembers[];
  onChange?: (value: string[]) => void;
}

const GroupFormMember = ({ id, value, onChange }: GroupFormMemberProps) => {
  const defaultFilter: () => GetMembersGroupRequest = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });

  const [groupMembers, setGroupMembers] = useState<GroupMembers[]>([]);
  const [groupMembersTable, setGroupMembersTable] = useState<GroupMembers[]>(
    []
  );
  const [isFirst, setIsFirst] = useState(true);

  const [filterData, setFilterData] = useState<GetMembersGroupRequest>(
    defaultFilter()
  );
  const prevFilter = usePrevious<GetMembersGroupRequest>(filterData);
  const [meta, setMeta] = useState<BaseMetaDataListResponse>();

  const resetFilterData = useCallback(() => {
    setFilterData(defaultFilter());
  }, []);

  const isDetail = useMemo(() => {
    return !!id;
  }, [id]);

  const fetchAgents = useCallback(
    (params: LoadMoreValue) => {
      const limit = env.DEFAULT_PAGE_SIZE;
      // if (isDetail && isFirst && id) {
      //   setIsFirst(false);
      //   return UserGroupRepository()
      //     .getListMembers(id, {
      //       ...filterData,
      //       limit: 10000,
      //     })
      //     .pipe(
      //       map(({ data }) => {
      //         return {
      //           options: data.data.map((item) => ({
      //             label: item.name,
      //             value: item._id,
      //             obj: item,
      //           })),
      //           canLoadMore: true,
      //         };
      //       })
      //     );
      // }
      return AgentRepository()
        .getList({
          page: params.page,
          limit: limit,
          query: params.searchText,
        })
        .pipe(
          map(({ data }) => {
            return {
              options: data.data.map((item) => ({
                label: item.lastName.includes("admin")
                  ? item.firstName
                  : item.firstName + item.lastName,
                value: item._id,
                obj: item,
              })),
              canLoadMore: params.page < data.metadata.totalPage,
            };
          })
        );
    },
    [AgentRepository, groupMembers, isFirst, id]
  );

  const handleSelectAgent = useCallback((value: any) => {
    console.log(value, "value");
    // setGroupMembers(
    //   value.map((item) => ({
    //     _id: item.key,
    //     email: item.value.email,
    //     name: item.value.label,
    //   }))
    // );
  }, []);

  useEffect(() => {
    setGroupMembersTable(groupMembers);
    const ids = groupMembers.map((item) => item._id);
    onChange && onChange(ids);
  }, [groupMembers]);

  const { run: getListMemberGroupApi, processing: loadingGetList } = useJob(
    (id: string, payload: GetMembersGroupRequest) => {
      return UserGroupRepository()
        .getListMembers(id, payload)
        .pipe(
          map(({ data }) => {
            setGroupMembers(data.data);
            setMeta(data.metadata);
          })
        );
    },
    { showLoading: true }
  );

  const { run: getListMemberGroupDebounce } = useDebounceFn(
    (id: string, payload: GetMembersGroupRequest) => {
      getListMemberGroupApi(id, payload);
    },
    { wait: 300 }
  );

  useEffect(() => {
    if (isDetail && id) {
      if (prevFilter?.query !== filterData.query && filterData.query) {
        getListMemberGroupDebounce(id, filterData);
      } else {
        getListMemberGroupApi(id, filterData);
      }
    }
  }, [filterData, id, isDetail]);

  return (
    <div>
      <div className="pb-6">
        <Select.Ajax
          mode="multiple"
          placeholder="Search agents"
          onChange={handleSelectAgent}
          loadMore={fetchAgents}
        />
      </div>
    </div>
  );
};

export default GroupFormMember;
