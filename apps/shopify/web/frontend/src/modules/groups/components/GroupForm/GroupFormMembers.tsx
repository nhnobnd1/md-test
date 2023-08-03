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
import { useToast } from "@shopify/app-bridge-react";
import {
  EmptySearchResult,
  Filters,
  IndexTable,
  Loading,
  Text,
} from "@shopify/polaris";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { ButtonDelete } from "src/components/Button/ButtonDelete";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import { Pagination } from "src/components/Pagination";
import {
  LoadMoreValue,
  Select,
  SelectOptions,
  SelectedObj,
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
  const { t, i18n } = useTranslation();
  const { show } = useToast();

  const prevFilter = usePrevious<GetMembersGroupRequest>(filterData);
  // create onChange groupMembers, edit onChange groupIds
  const [groupMembers, setGroupMembers] = useState<GroupMembers[]>([]);
  const [groupIds, setGroupIds] = useState<string[]>(value ?? []);
  const [groupMembersTable, setGroupMembersTable] = useState<GroupMembers[]>(
    []
  );
  const [meta, setMeta] = useState<BaseMetaDataListResponse>();
  const [disablePagination, setDisablePagination] = useState(false);
  const {
    state: modalRemoveMember,
    on: openModalRemoveMember,
    off: closeModalRemoveMember,
  } = useToggle();
  const [direction, setDirection] = useState<"descending" | "ascending">(
    "descending"
  );
  const [indexSort, setIndexSort] = useState<number | undefined>(undefined);
  const isDetail = useMemo(() => {
    return !!id;
  }, [id]);
  const listSort = ["name", "email"];

  const handleSort = (
    headingIndex: number,
    direction: "descending" | "ascending"
  ) => {
    setIndexSort(Number(headingIndex));
    setDirection(direction);
    setFilterData((pre) => ({
      ...pre,
      sortBy: listSort[Number(headingIndex)],
      sortOrder: direction === "ascending" ? 1 : -1,
    }));
  };
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
        setDisablePagination(true);
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
                name: value.value?.firstName,
              },
              ...values,
            ];
          });
        }
      }
    },
    [groupMembers, groupIds]
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
            setGroupMembers(data.data);

            setMeta(data.metadata);
          }),
          catchError((err) => {
            show(t("messages:error.something_went_wrong"), { isError: true });

            return of(err);
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
        const filterRegex = new RegExp(filterData.query.toLowerCase(), "g");
        setGroupMembersTable(
          groupMembers.filter(
            (item) =>
              item.name.toLocaleLowerCase().match(filterRegex) ||
              item.email.toLocaleLowerCase().match(filterRegex)
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
  }, [groupMembers]);

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
      <div className="xs:block md:flex gap-2">
        <div className="pb-6 w-full">
          <Select.Ajax
            label=""
            placeholder="+ Add member"
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
        <div className="pb-2 w-full">
          <Filters
            queryValue={filterData.query}
            onQueryChange={handleFiltersQueryChange}
            onQueryClear={handleQueryValueRemove}
            queryPlaceholder="Search member"
            filters={[]}
            onClearAll={resetFilterData}
          ></Filters>
        </div>
      </div>
      {loadingGetList && <Loading />}
      <IndexTable
        loading={loadingGetList}
        itemCount={groupMembersTable.length}
        hasMoreItems
        selectable={false}
        lastColumnSticky
        emptyState={
          <EmptySearchResult
            title={"No member group yet"}
            description={
              "Sorry! There is no records matched with your search criteria"
            }
            withIllustration
          />
        }
        headings={[{ title: "Name" }, { title: "Email" }, { title: "Action" }]}
        sortable={[true, true, false]}
        sortDirection={direction}
        sortColumnIndex={indexSort}
        onSort={handleSort}
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
                destructive
                onClick={() => handleOpenModalRemove(membersItem)}
              ></ButtonDelete>
            </IndexTable.Cell>
          </IndexTable.Row>
        ))}
      </IndexTable>
      <div className="flex items-center justify-center py-3">
        {filterData.page && filterData.limit && !disablePagination && (
          <Pagination
            total={isDetail && meta ? meta.totalCount : groupMembers.length}
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
