import {
  generatePath,
  useDebounceFn,
  useJob,
  useNavigate,
} from "@moose-desk/core";
import { BaseListTagRequest, Tag, TagRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Button,
  ButtonGroup,
  Card,
  ChoiceList,
  EmptySearchResult,
  Filters,
  Icon,
  IndexTable,
  Link,
  Page,
  Popover,
  Stack,
  Text,
} from "@shopify/polaris";
import { DeleteMajor, EditMajor, SortMinor } from "@shopify/polaris-icons";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import Pagination from "src/components/Pagination/Pagination";
import env from "src/core/env";
import SettingRoutePaths from "src/modules/setting/routes/paths";

export default function TagIndexPage() {
  const navigate = useNavigate();
  const { show } = useToast();
  const [tags, setTags] = useState<Tag[]>([]);
  const [popoverSort, setPopoverSort] = useState(false);
  const [deleteTag, setDeleteTag] = useState<string>("");

  const togglePopoverSort = useCallback(
    () => setPopoverSort((popoverSort) => !popoverSort),
    []
  );
  const resourceName = {
    singular: "tag",
    plural: "tags",
  };
  const rowMarkup = tags.map(
    ({ id, name, updatedDatetime, ticketsCount, createdDatetime }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell className="py-3">
          <Link
            monochrome
            onClick={() => navigateToViewTicket(name)}
            removeUnderline
          >
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {`${name}`}
            </Text>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell className="py-3">
          <div
            className="hover:underline hover:cursor-pointer"
            onClick={() => navigateToViewTicket(name)}
          >
            {ticketsCount}
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell className="py-3">
          {updatedDatetime
            ? dayjs(updatedDatetime).format("DD-MM-YYYY")
            : dayjs(createdDatetime).format("DD-MM-YYYY")}
        </IndexTable.Cell>
        <IndexTable.Cell className="py-3">
          <ButtonGroup>
            <Button
              onClick={() => navigateShowDetails(id)}
              icon={() => <Icon source={() => <EditMajor />} color="base" />}
            />
            <Button
              icon={() => (
                <Icon
                  accessibilityLabel="Delete"
                  source={() => <DeleteMajor />}
                />
              )}
              onClick={() => handleOpenModalDelete(name)}
              destructive
            />
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  const navigateCreate = () => {
    return navigate(SettingRoutePaths.Workdesk.Tag.Create);
  };
  const navigateToViewTicket = (id: string) => {
    return navigate(
      generatePath(SettingRoutePaths.Workdesk.Tag.ViewTicket, { id })
    );
  };
  const navigateShowDetails = useCallback((id: string) => {
    navigate(generatePath(SettingRoutePaths.Workdesk.Tag.Edit, { id }));
  }, []);
  const sortTemplate = [
    {
      sortBy: "name",
      sortOrder: 1,
    },
    {
      sortBy: "name",
      sortOrder: -1,
    },
    {
      sortBy: "ticketsCount",
      sortOrder: 1,
    },
    {
      sortBy: "ticketsCount",
      sortOrder: -1,
    },
    {
      sortBy: "updatedDatetime",
      sortOrder: -1,
    },
    {
      sortBy: "updatedDatetime",
      sortOrder: -1,
    },
    {
      sortBy: undefined,
      sortOrder: undefined,
    },
  ];
  const [sortTag, setSortTag] = useState(6);
  const [valueSortTag, setValueSortTag] = useState(
    sortTemplate[Number(sortTag)]
  );

  const defaultFilter = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
    query: "",
    ...valueSortTag,
  });
  const [filterData, setFilterData] =
    useState<BaseListTagRequest>(defaultFilter);
  const handleSearchChange = useCallback((value: string) => {
    setFilterData(() => ({
      page: 1,
      ...filterData,
      query: value,
    }));
  }, []);
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
  const choices = [
    { label: "Sort by name A-Z", value: "0" },
    { label: "Sort by name Z-A", value: "1" },
    { label: "Sort by # of Tickets A-Z", value: "2" },
    { label: "Sort by # of Tickets Z-A", value: "3" },
    { label: "Sort by Last Updated A-Z", value: "4" },
    { label: "Sort by Last Updated Z-A", value: "5" },
  ];
  const handleSortChange = useCallback((value) => {
    setSortTag(parseInt(value[0]));
  }, []);
  const sortButton = (
    <Button
      onClick={togglePopoverSort}
      icon={<Icon source={() => <SortMinor />} color="base" />}
    >
      Sort
    </Button>
  );
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModalDelete = (id: string) => {
    setIsOpen(true);
    setDeleteTag(id);
  };
  const { run: handleRemoveTag } = useJob((dataDelete: string[]) => {
    return TagRepository()
      .delete({ names: dataDelete })
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            show("Delete tag success");
            fetchListTag();
            setDeleteTag("");
          } else {
            show("Delete tag failed", {
              isError: true,
            });
          }
        }),
        catchError((error) => {
          show("Delete tag failed", {
            isError: true,
          });
          return of(error);
        })
      );
  });
  const {
    run: fetchListTag,
    result,
    processing: loadTag,
  } = useJob(
    () => {
      return TagRepository()
        .getList(filterData)
        .pipe(
          map(({ data }) => {
            setTags(
              data.data.map((item) => ({
                ...item,
                id: item._id,
              }))
            );
            return data;
          })
        );
    },
    { showLoading: false }
  );
  const { run: callAPI } = useDebounceFn(() => fetchListTag(), {
    wait: 300,
  });
  useEffect(() => {
    setValueSortTag(sortTemplate[sortTag]);
  }, [sortTag]);
  useEffect(() => {
    setFilterData({
      ...filterData,
      ...valueSortTag,
    });
  }, [valueSortTag]);
  useEffect(() => {
    callAPI();
  }, [filterData]);
  return (
    <>
      <Page
        title="Manage tags"
        primaryAction={{
          content: "Add new tag",
          onAction: navigateCreate,
        }}
        compactTitle
        fullWidth
      >
        <ModalDelete
          title="Are you sure that you want to premanently remove this Tag?"
          open={isOpen}
          onClose={() => setIsOpen(false)}
          content={
            "This Tag will be removed permanently. This actions can not be undone. All tickets which are using this tag will get affected too."
          }
          deleteAction={() => handleRemoveTag([deleteTag])}
          textConfirm="Remove"
        />
        <Card>
          <div className="flex-1 px-4 pt-4 pb-2">
            <Stack distribution="trailing" spacing="loose">
              <Stack.Item fill={true}>
                <Filters
                  queryValue={filterData.query}
                  onQueryChange={handleSearchChange}
                  onQueryClear={handleQueryValueRemove}
                  queryPlaceholder="Search"
                  filters={[]}
                  onClearAll={resetFilterData}
                />
              </Stack.Item>
              <Stack.Item>
                <Popover
                  active={popoverSort}
                  activator={sortButton}
                  autofocusTarget="first-node"
                  onClose={togglePopoverSort}
                  preferredAlignment={"left"}
                  sectioned
                >
                  <ChoiceList
                    title="Sort tag"
                    titleHidden
                    choices={choices}
                    selected={[sortTag.toString()] || []}
                    onChange={handleSortChange}
                  />
                </Popover>
              </Stack.Item>
            </Stack>
          </div>
          <IndexTable
            resourceName={resourceName}
            itemCount={tags.length}
            selectable={false}
            headings={[
              { title: "Name" },
              { title: "# of tickets" },
              { title: "Last updated" },
              { title: "Action" },
            ]}
            hasMoreItems
            loading={loadTag}
            emptyState={
              <EmptySearchResult
                title={
                  "Sorry! There is no records matched with your search creteria"
                }
                description={"Try changing the filters or search term"}
                withIllustration
              />
            }
          >
            {rowMarkup}
          </IndexTable>
        </Card>
        {result && result.metadata.totalCount ? (
          <div className="flex items-center justify-center mt-4">
            <Pagination
              total={result ? result.metadata.totalCount : 1}
              pageSize={filterData.limit ?? 0}
              currentPage={filterData.page ?? 1}
              onChangePage={(page) =>
                setFilterData((val) => ({ ...val, page }))
              }
              previousTooltip={"Previous"}
              nextTooltip={"Next"}
            />
          </div>
        ) : null}
      </Page>
    </>
  );
}
