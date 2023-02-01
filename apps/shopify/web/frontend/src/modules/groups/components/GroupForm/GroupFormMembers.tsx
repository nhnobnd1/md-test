import {
  useDebounceFn,
  useJob,
  usePrevious,
  useToggle,
} from "@moose-desk/core";
import {
  AgentRepository,
  BaseMetaDataListResponse,
  GetMembersGroupRequest,
  GroupMembers,
  UserGroupRepository,
} from "@moose-desk/repo";
import { EmptySearchResult, Filters, IndexTable, Text } from "@shopify/polaris";
import { uniqBy } from "lodash-es";
import { useCallback, useEffect, useMemo, useState } from "react";
import { map } from "rxjs";
import { ButtonDelete } from "src/components/Button/ButtonDelete";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import { Pagination } from "src/components/Pagination";
import {
  LoadMoreValue,
  Select,
  SelectedObj,
  SelectOptions,
} from "src/components/Select";
import env from "src/core/env";

interface GroupFormMembersProps {
  id?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
}

const GroupFormMembers = ({ id, value, onChange }: GroupFormMembersProps) => {
  const defaultFilter: () => GetMembersGroupRequest = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
    query: "",
  });

  const [filterData, setFilterData] = useState<GetMembersGroupRequest>(
    defaultFilter()
  );
  const prevFilter = usePrevious<GetMembersGroupRequest>(filterData);
  // create onChange groupMembers, edit onChange groupIds
  const [groupMembers, setGroupMembers] = useState<GroupMembers[]>([]);
  const [groupIds, setGroupIds] = useState<string[]>(value ?? []);
  const [groupMembersTable, setGroupMembersTable] = useState<GroupMembers[]>(
    []
  );
  const [meta, setMeta] = useState<BaseMetaDataListResponse>();
  const {
    state: modalRemoveMember,
    on: openModalRemoveMember,
    off: closeModalRemoveMember,
  } = useToggle();

  const isDetail = useMemo(() => {
    return !!id;
  }, [id]);

  const handleFiltersQueryChange = useCallback(
    (queryValue: string) => {
      setFilterData((old) => {
        return {
          ...old,
          query: queryValue,
          page: 1,
        };
      });
    },
    [filterData]
  );

  const handleQueryValueRemove = useCallback(() => {
    setFilterData((old) => {
      return {
        ...old,
        query: "",
      };
    });
  }, []);

  const resetFilterData = useCallback(() => {
    setFilterData(defaultFilter());
  }, []);

  const [isFirst, setIsFirst] = useState(true);

  const fetchAgents = useCallback(
    (params: LoadMoreValue) => {
      const limit = env.DEFAULT_PAGE_SIZE;

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

  const handleSelectAgent = useCallback(
    (value: SelectedObj | SelectedObj[]) => {
      if (!Array.isArray(value) && value) {
        if (isDetail) {
          setGroupIds([...groupIds, value.key]);
        }
        const memberExist = groupMembers.find((item) => item._id === value.key);
        if (!memberExist) {
          setGroupMembers((values) => {
            return [
              {
                _id: value.key,
                email: value.value?.email,
                name: value.value?.label,
              },
              ...values,
            ];
          });
        }
      }
    },
    [groupMembers]
  );

  const { run: getListMemberGroupApi, processing: loadingGetList } = useJob(
    (
      id: string,
      payload: GetMembersGroupRequest,
      option?: { reset: boolean }
    ) => {
      return UserGroupRepository()
        .getListMembers(id, payload)
        .pipe(
          map(({ data }) => {
            option?.reset
              ? setGroupMembers(data.data)
              : setGroupMembers(uniqBy([...data.data, ...groupMembers], "_id"));

            setMeta(data.metadata);
          })
        );
    },
    { showLoading: true }
  );

  const { run: getListMemberGroupDebounce } = useDebounceFn(
    (id: string, payload: GetMembersGroupRequest) => {
      getListMemberGroupApi(id, payload, { reset: true });
    },
    { wait: 300 }
  );

  const [memberRemove, setMemberRemove] = useState<GroupMembers | null>(null);

  const prevMemberRemove = usePrevious<GroupMembers | null>(memberRemove);

  const handleOpenModalRemove = useCallback((member: GroupMembers) => {
    setMemberRemove(member);
  }, []);

  const removeMembersItem = useCallback(
    (id: string) => {
      if (isDetail) {
        setGroupIds(groupIds.filter((item) => item !== id));
      }
      setGroupMembers(groupMembers.filter((item) => item._id !== id));
    },
    [groupMembers]
  );

  const handleChangePagination = useCallback((page: number) => {
    setFilterData((value) => ({
      ...value,
      page: page,
    }));
  }, []);

  useEffect(() => {
    if (prevMemberRemove?._id !== memberRemove?._id && memberRemove) {
      openModalRemoveMember();
    }
  }, [memberRemove]);

  useEffect(() => {
    if (isDetail && id) {
      if (prevFilter?.query !== filterData.query && filterData.query) {
        getListMemberGroupDebounce(id, {
          ...filterData,
        });
      } else {
        getListMemberGroupApi(id, filterData);
      }
    } else {
      if (filterData.query) {
        setGroupMembersTable(
          groupMembers.filter((item) =>
            item.name.includes(filterData.query ?? "")
          )
        );
      } else {
        setGroupMembersTable(groupMembers);
      }
    }
  }, [filterData, id]);

  useEffect(() => {
    setGroupMembersTable(groupMembers);
    if (isDetail) {
      onChange && onChange(groupIds);
    } else {
      const ids = groupMembers.map((item) => item._id);
      onChange && onChange(ids);
    }
  }, [groupMembers, groupIds]);

  useEffect(() => {
    value && setGroupIds(value);
  }, [value]);

  return (
    <>
      <ModalDelete
        open={modalRemoveMember}
        title={`Remove member ${memberRemove?.name} from group`}
        content="This Agent will be removed permanently. This action cannot be undone."
        onClose={closeModalRemoveMember}
        textConfirm={"Remove"}
        deleteAction={() =>
          memberRemove?._id && removeMembersItem(memberRemove._id)
        }
      />
      <div className="pb-6">
        <Select.Ajax
          label="Add members"
          placeholder="Search agents"
          disableValues={groupIds}
          height="250px"
          chooseRefresh
          renderOption={(record: SelectOptions, index: number) =>
            `${record.label} - ${record.obj.email}`
          }
          onChange={handleSelectAgent}
          loadMore={fetchAgents}
        />
      </div>
      <div className="pb-2">
        <Filters
          queryValue={filterData.query}
          onQueryChange={handleFiltersQueryChange}
          onQueryClear={handleQueryValueRemove}
          queryPlaceholder="Search"
          filters={[]}
          onClearAll={resetFilterData}
        ></Filters>
      </div>
      <IndexTable
        loading={loadingGetList}
        itemCount={groupMembersTable.length}
        hasMoreItems
        selectable={false}
        lastColumnSticky
        emptyState={
          <EmptySearchResult
            title={"No member group yet"}
            description={"Try changing the filters or search term"}
            withIllustration
          />
        }
        headings={[{ title: "Name" }, { title: "Email" }, { title: "Action" }]}
      >
        {groupMembersTable.map((membersItem, index) => (
          <IndexTable.Row
            id={membersItem._id}
            key={membersItem._id}
            position={index}
          >
            <IndexTable.Cell className="py-3">
              <div className="unstyle-link">
                <Text variant="bodyMd" fontWeight="semibold" as="span">
                  {membersItem.name}
                </Text>
              </div>
            </IndexTable.Cell>
            <IndexTable.Cell className="py-3">
              <Text variant="bodyMd" as="span">
                {membersItem.email}
              </Text>
            </IndexTable.Cell>
            <IndexTable.Cell className="py-3">
              <ButtonDelete
                onClick={() => handleOpenModalRemove(membersItem)}
              ></ButtonDelete>
            </IndexTable.Cell>
          </IndexTable.Row>
        ))}
      </IndexTable>
      <div className="flex items-center justify-center py-8">
        {filterData.page &&
          filterData.limit &&
          meta?.totalCount &&
          groupMembers.length > 0 && (
            <Pagination
              total={meta.totalCount}
              pageSize={filterData.limit ?? 0}
              currentPage={filterData.page}
              onChangePage={handleChangePagination}
            />
          )}
      </div>
    </>
  );
};

export default GroupFormMembers;
