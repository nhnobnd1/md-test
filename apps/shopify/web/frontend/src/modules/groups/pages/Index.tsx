import {
  generatePath,
  PageComponent,
  useDebounceFn,
  useDidUpdate,
  useJob,
  useNavigate,
  usePrevious,
  useToggle,
} from "@moose-desk/core";
import {
  BaseMetaDataListResponse,
  GetListUserGroupRequest,
  ScreenType,
  UserGroup,
  UserGroupRepository,
} from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Button,
  Card,
  EmptySearchResult,
  IndexTable,
  Link,
  Loading,
  Page,
  Text,
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { ButtonDelete } from "src/components/Button/ButtonDelete";
import { ButtonEdit } from "src/components/Button/ButtonEdit";
import { HeaderList } from "src/components/HeaderList";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import { Pagination } from "src/components/Pagination";
import env from "src/core/env";
import useScreenType from "src/hooks/useScreenType";
import GroupsRoutePaths from "src/modules/groups/routes/paths";

interface GroupsIndexPageProps {}

const GroupsIndexPage: PageComponent<GroupsIndexPageProps> = () => {
  const navigate = useNavigate();
  const [sortValue, setSortValue] = useState<string[]>([]);
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const { show } = useToast();
  const { t, i18n } = useTranslation();

  const {
    state: btnSort,
    toggle: toggleBtnSort,
    off: closeBtnSort,
  } = useToggle();

  const {
    state: modalDelete,
    on: openModalDelete,
    off: closeModalDelete,
  } = useToggle(false);

  const defaultFilter: () => GetListUserGroupRequest = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });
  const [screenType] = useScreenType();
  const [showTitle, setShowTitle] = useState(true);

  const [filterData, setFilterData] = useState<GetListUserGroupRequest>(
    defaultFilter()
  );
  const prevFilter = usePrevious<GetListUserGroupRequest>(filterData);
  const [direction, setDirection] = useState<"descending" | "ascending">(
    "descending"
  );
  const [indexSort, setIndexSort] = useState<number | undefined>(undefined);
  const [meta, setMeta] = useState<BaseMetaDataListResponse>();

  const { run: getListGroupApi, processing: loadingList } = useJob(
    (payload: GetListUserGroupRequest) => {
      return UserGroupRepository()
        .getList(payload)
        .pipe(
          map(({ data }) => {
            const listGroup = data.data.map((item) => ({
              ...item,
              id: item._id,
            }));
            setGroups(listGroup);
            setMeta(data.metadata);
          })
        );
    }
  );

  const { run: deleteGroup, processing: loadingDelete } = useJob(
    (id: string) => {
      return UserGroupRepository()
        .delete(id)
        .pipe(
          map(({ data }) => {
            setIdDelete(null);
            closeModalDelete();
            if (data.statusCode === 200) {
              getListGroupApi(filterData);
              show(t("messages:success.delete_group"));
            } else {
              show(t("messages:error.delete_group"), {
                isError: true,
              });
            }
          }),
          catchError((error) => {
            show(t("messages:error.delete_group"), {
              isError: true,
            });
            return of(error);
          })
        );
    }
  );

  const listSort = ["name", "memberCount"];

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

  const { run: getListDebounce } = useDebounceFn(
    (payload: GetListUserGroupRequest) => {
      getListGroupApi(payload);
    },
    { wait: 300 }
  );

  const handleFiltersQueryChange = useCallback((queryValue: string) => {
    setFilterData((old) => {
      return {
        ...old,
        query: queryValue,
      };
    });
  }, []);

  const resetFilterData = useCallback(() => {
    setFilterData(defaultFilter());
  }, []);

  const handleQueryValueRemove = useCallback(() => {
    setFilterData((old) => {
      return {
        ...old,
        query: "",
      };
    });
  }, []);

  const [idDelete, setIdDelete] = useState<string | null>(null);

  const prevIdDelete = usePrevious(idDelete);

  const handleOpenModalDelete = useCallback((id: string) => {
    setIdDelete(id);
  }, []);

  useDidUpdate(() => {
    if (prevIdDelete !== idDelete && idDelete) {
      openModalDelete();
    }
  }, [idDelete]);

  useEffect(() => {
    if (prevFilter?.query !== filterData.query && filterData.query) {
      getListDebounce(filterData);
    } else {
      getListGroupApi(filterData);
    }
  }, [filterData]);
  const css = `
  .Polaris-Page-Header__RightAlign ,.Polaris-Page-Header__PrimaryActionWrapper{
    width:100%!important;
    margin:0
  }
  `;
  return (
    <>
      <style scoped>{screenType === ScreenType.SM ? css : ""}</style>{" "}
      <Page
        title={
          (
            <div
              className={`min-w-[70px]  ${
                showTitle ? "inline-block" : "hidden"
              }`}
            >
              <span>Groups</span>
            </div>
          ) as any
        }
        primaryAction={
          <div className="flex justify-end">
            <HeaderList
              setShowTitle={setShowTitle}
              handleSearch={handleFiltersQueryChange}
            >
              <Button
                primary
                onClick={() => {
                  navigate(generatePath(GroupsRoutePaths.Create));
                }}
              >
                Add new
              </Button>
            </HeaderList>
          </div>
        }
        fullWidth
      >
        <ModalDelete
          open={modalDelete}
          onClose={() => {
            setIdDelete(null);
            closeModalDelete();
          }}
          closePopupAction={false}
          title="Are you sure that you want to permanently remove this group?"
          content="This group will be removed permanently. This action cannot be undone."
          loadingConfirm={loadingDelete}
          deleteAction={() => idDelete && deleteGroup(idDelete)}
        />
        <Card>
          {loadingList && <Loading />}
          <IndexTable
            resourceName={{ singular: "group", plural: "groups" }}
            itemCount={groups.length}
            selectable={false}
            hasMoreItems
            lastColumnSticky
            loading={loadingList}
            emptyState={
              <EmptySearchResult
                title={
                  "Sorry! There is no records matched with your search criteria"
                }
                description={"Try changing the filters or search term"}
                withIllustration
              />
            }
            headings={[
              { title: "Group name" },
              { title: "Number of Agents" },
              { title: "Action" },
            ]}
            sortable={[true, true, false]}
            sortDirection={direction}
            sortColumnIndex={indexSort}
            onSort={handleSort}
          >
            {groups.map((groupItem, index) => (
              <IndexTable.Row
                id={groupItem._id}
                key={groupItem._id}
                position={index}
              >
                <IndexTable.Cell className="py-3">
                  <div className="unstyle-link">
                    <Link
                      data-polaris-unstyled
                      url={generatePath(GroupsRoutePaths.Detail, {
                        id: groupItem._id,
                      })}
                      removeUnderline={true}
                    >
                      <Text variant="bodyMd" fontWeight="semibold" as="span">
                        {groupItem.name}
                      </Text>
                    </Link>
                  </div>
                </IndexTable.Cell>
                <IndexTable.Cell className="py-3">
                  <div className="text-right max-w-[100px]">
                    {" "}
                    {groupItem.memberCount}
                  </div>
                </IndexTable.Cell>
                <IndexTable.Cell className="py-3">
                  <div className="flex gap-2">
                    <ButtonEdit
                      isTable
                      onClick={() =>
                        navigate(
                          generatePath(GroupsRoutePaths.Detail, {
                            id: groupItem._id,
                          })
                        )
                      }
                    ></ButtonEdit>
                    <ButtonDelete
                      isTable
                      onClick={() => handleOpenModalDelete(groupItem._id)}
                      // destructive
                    >
                      Remove
                    </ButtonDelete>
                  </div>
                </IndexTable.Cell>
              </IndexTable.Row>
            ))}
          </IndexTable>
          {meta?.totalCount ? (
            <div className="flex items-center justify-center py-8">
              {filterData.page && filterData.limit && meta?.totalCount && (
                <Pagination
                  total={meta.totalCount}
                  pageSize={filterData.limit ?? 0}
                  currentPage={filterData.page}
                  onChangePage={(page) =>
                    setFilterData((val) => {
                      return { ...val, page };
                    })
                  }
                />
              )}
            </div>
          ) : null}
        </Card>
      </Page>
    </>
  );
};

export default GroupsIndexPage;
