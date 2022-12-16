import { useToast } from "@shopify/app-bridge-react";
import {
  Card,
  Filters,
  IndexTable,
  Link,
  Page,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { isEmpty } from "lodash-es";
import { useCallback, useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { catchError, map, of } from "rxjs";
import ModalDelete from "src/components/ModalDelete";
import Pagination from "src/components/Pagination/Pagination";
import env from "src/core/env";
import { useDebounceFn, useJob, useMount } from "src/core/hooks";
import useTable from "src/core/hooks/useTable";
import { BaseListRequest } from "src/models/Request";
import { Tag } from "src/modules/setting/modal/workDesk/Tag";
import TagRepository from "src/modules/setting/repository/workDesk/TagRepository";
import SettingRoutePaths from "src/modules/setting/routes/paths";
export default function TagIndexPage() {
  const param = useParams();
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
    ({ id, firstName, lastName, email, storeId }, index) => (
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
              {`${firstName} ${lastName}`}
            </Text>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell className="py-3">{email}</IndexTable.Cell>
        <IndexTable.Cell className="py-3">{storeId}</IndexTable.Cell>
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
  const { page, setPage, rowsPerPage } = useTable({
    defaultRowsPerPage: env.DEFAULT_PAGE_SIZE,
  });
  const defaultFilter = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
    query: "",
  });
  const [filterData, setFilterData] = useState<BaseListRequest>(
    !isEmpty(param)
      ? {
          page: page ? Number(page) : 1,
          limit: rowsPerPage ? Number(rowsPerPage) : env.DEFAULT_PAGE_SIZE,
          query: "",
        }
      : {
          page: 1,
          limit: env.DEFAULT_PAGE_SIZE,
        }
  );
  const handleSearchChange = (value: string) => {
    setPage(1);
    setFilterData(() => ({
      ...filterData,
      query: value,
    }));
  };
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
    setFilterData({
      ...filterData,
      page: page,
    });
  }, [page]);
  useEffect(() => {
    callAPI();
  }, [filterData]);
  useMount(() => setPage(1));
  return (
    <>
      <Page
        title="Tags"
        subtitle="List of tag"
        primaryAction={{
          content: "Add new",
          onAction: navigateCreate,
        }}
        compactTitle
        fullWidth
      >
        <ModalDelete
          title="Do you want to delete tags?"
          open={isOpen}
          onClose={() => setIsOpen(false)}
          content={"Are you sure you want to delete these tags?"}
          deleteAction={handleRemoveTag}
          dataDelete={selectedResources}
        />
        <Card sectioned>
          <div className="mb-4">
            <Filters
              queryValue={filterData.query}
              onQueryChange={handleSearchChange}
              onQueryClear={handleQueryValueRemove}
              queryPlaceholder="Search tags"
              filters={[]}
              onClearAll={resetFilterData}
            />
          </div>
          <IndexTable
            resourceName={resourceName}
            itemCount={tags.length}
            selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            headings={[
              { title: "Tag name" },
              { title: "Email" },
              { title: "Number of tickets" },
            ]}
            hasMoreItems
            promotedBulkActions={promotedBulkActions}
            loading={loadTag}
          >
            {rowMarkup}
          </IndexTable>
        </Card>
        <div className="flex items-center justify-center mt-4">
          <Pagination
            total={result ? result.metadata.totalCount : 1}
            pageSize={filterData.limit ?? 0}
            currentPage={page}
            hasPrevious
            onPrevious={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
            hasNext
            onNext={() => {
              if (
                page <
                (result
                  ? result.metadata.totalCount / env.DEFAULT_PAGE_SIZE
                  : 1)
              ) {
                setPage(page + 1);
              }
            }}
            previousTooltip={"Previous"}
            nextTooltip={"Next"}
          />
        </div>
      </Page>
    </>
  );
}
