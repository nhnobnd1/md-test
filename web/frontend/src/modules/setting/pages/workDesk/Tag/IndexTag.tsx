import { useToast } from "@shopify/app-bridge-react";
import {
  Button,
  Card,
  ChoiceList,
  EmptySearchResult,
  Filters,
  Icon,
  IndexTable,
  Link,
  Page,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { SortMinor } from "@shopify/polaris-icons";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { catchError, map, of } from "rxjs";
import ModalDelete from "src/components/ModalDelete";
import Pagination from "src/components/Pagination/Pagination";
import env from "src/core/env";
import { useDebounceFn, useJob } from "src/core/hooks";
import {
  BaseListTagRequest,
  Tag,
} from "src/modules/setting/modal/workDesk/Tag";
import TagRepository from "src/modules/setting/repository/workDesk/TagRepository";
import SettingRoutePaths from "src/modules/setting/routes/paths";
export default function SettingIndexPage() {
  const navigate = useNavigate();
  const { show } = useToast();
  const [tags, setTags] = useState<Tag[]>([]);
  const resourceName = {
    singular: "tag",
    plural: "tags",
  };
  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
  } = useIndexResourceState<Tag>(tags);

  const rowMarkup = tags.map(
    ({ id, name, updatedDatetime, createdDatetime }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell className="py-3">
          <Link
            monochrome
            dataPrimaryLink
            onClick={() => navigateShowDetails(id)}
            removeUnderline
          >
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {`${name}`}
            </Text>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell className="py-3">{`###`}</IndexTable.Cell>
        <IndexTable.Cell className="py-3">
          {updatedDatetime
            ? dayjs(updatedDatetime).format("DD-MM-YYYY")
            : dayjs(createdDatetime).format("DD-MM-YYYY")}
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  const navigateCreate = () => {
    return navigate(SettingRoutePaths.Workdesk.Tag.Create);
  };
  const navigateShowDetails = useCallback((id: string) => {
    navigate(generatePath(SettingRoutePaths.Workdesk.Tag.Edit, { id }));
  }, []);
  const promotedBulkActions = [
    {
      content: "Remove tag",
      onAction: () => handleOpenModalDelete(),
    },
  ];
  const sortTemplate = [
    {
      sortBy: "name",
      sortOder: 1,
    },
    {
      sortBy: "name",
      sortOder: -1,
    },
    {
      sortBy: "email",
      sortOder: 1,
    },
    {
      sortBy: "email",
      sortOder: -1,
    },
  ];
  const [sortTag, setSortTag] = useState(0);
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
    { label: "Sort by email A-Z", value: "2" },
    { label: "Sort by email Z-A", value: "3" },
  ];
  const handleSortChange = useCallback((value) => {
    setSortTag(parseInt(value[0]));
  }, []);
  const filters = [
    {
      key: "sort",
      label: ` Sort`,
      filter: (
        <ChoiceList
          title="Sort tag"
          titleHidden
          choices={choices}
          selected={[sortTag.toString()] || []}
          onChange={handleSortChange}
        />
      ),
      shortcut: true,
      hideClearButton: true,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModalDelete = () => {
    setIsOpen(true);
  };
  const { run: handleRemoveTag } = useJob((dataDelete: string[]) => {
    return TagRepository.delete({ ids: dataDelete }).pipe(
      map(({ data }) => {
        if (data.statusCode === 200) {
          show("Delete tag success");
          fetchListTag();
          clearSelection();
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
      return TagRepository.getList(filterData).pipe(
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
          title="Are you sure that you want to remove this tag?"
          open={isOpen}
          onClose={() => setIsOpen(false)}
          content={
            "This tag will be removed permanently. This action cannot be undone. All tickets which are using this tag will get affected too."
          }
          deleteAction={() => handleRemoveTag(selectedResources)}
        />
        <Card>
          <div className="flex items-center px-4 pt-4 pb-2">
            <Filters
              queryValue={filterData.query}
              onQueryChange={handleSearchChange}
              onQueryClear={handleQueryValueRemove}
              queryPlaceholder="Search"
              filters={[]}
              onClearAll={resetFilterData}
            />
            <div className="w-full">
              <Button icon={<Icon source={() => <SortMinor />} color="base" />}>
                Sort
              </Button>
            </div>
          </div>
          <IndexTable
            resourceName={resourceName}
            itemCount={tags.length}
            selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            headings={[
              { title: "Name" },
              { title: "Number of tickets" },
              { title: "Last updated" },
            ]}
            hasMoreItems
            promotedBulkActions={promotedBulkActions}
            loading={loadTag}
            emptyState={
              <EmptySearchResult
                title={"No tag yet"}
                description={"Try changing the filters or search term"}
                withIllustration
              />
            }
          >
            {rowMarkup}
          </IndexTable>
        </Card>
        <div className="flex items-center justify-center mt-4">
          <Pagination
            total={result ? result.metadata.totalCount : 1}
            pageSize={filterData.limit ?? 0}
            currentPage={filterData.page ?? 1}
            onChangePage={(page) => setFilterData((val) => ({ ...val, page }))}
            previousTooltip={"Previous"}
            nextTooltip={"Next"}
          />
        </div>
      </Page>
    </>
  );
}
