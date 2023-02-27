import {
  generatePath,
  PageComponent,
  useDidUpdate,
  useNavigate,
  usePrevious,
  useToggle,
} from "@moose-desk/core";
import {
  EmptySearchResult,
  Filters,
  IndexTable,
  LegacyCard,
  Page,
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { ButtonSort } from "src/components/Button/ButtonSort";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import env from "src/core/env";
import { SortOrderOptions } from "src/models/Form";
import CardStatistic from "src/modules/ticket/components/CardStatistic/CardStatistic";
import { optionsSort } from "src/modules/ticket/constant";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

interface TicketIndexPageProps {}

const TicketIndexPage: PageComponent<TicketIndexPageProps> = () => {
  const navigate = useNavigate();
  const {
    state: modalDelete,
    on: openModalDelete,
    off: closeModalDelete,
  } = useToggle(false);

  const defaultFilter: () => any = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });

  const [sortValue, setSortValue] = useState<string[]>([]);

  const {
    state: btnSort,
    toggle: toggleBtnSort,
    off: closeBtnSort,
  } = useToggle();

  const [filterData, setFilterData] = useState<any>(defaultFilter());
  const prevFilter = usePrevious<any>(filterData);

  const [meta, setMeta] = useState<any>();

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
      // get list debounce
    } else {
      // get list
    }
  }, [filterData]);

  const handleFiltersQueryChange = useCallback((queryValue: string) => {
    setFilterData((old: any) => {
      return {
        ...old,
        query: queryValue,
      };
    });
  }, []);

  const handleQueryValueRemove = useCallback(() => {
    setFilterData((old: any) => {
      return {
        ...old,
        query: "",
      };
    });
  }, []);

  const resetFilterData = useCallback(() => {
    setFilterData(defaultFilter());
  }, []);

  const handleSort = useCallback(
    (selected: string[]) => {
      const arraySort = selected[0].split(":");
      const sortBy = arraySort[0];
      const sortOrder = arraySort[1] === SortOrderOptions.ACS ? 1 : -1;
      setSortValue(selected);

      setFilterData((value: any) => {
        return { ...value, sortBy, sortOrder };
      });
    },
    [filterData]
  );

  return (
    <Page
      title="Ticket"
      primaryAction={{
        content: "Create New Ticket",
        onAction: () => navigate(generatePath(TicketRoutePaths.Create)),
      }}
      fullWidth
    >
      <ModalDelete
        open={modalDelete}
        onClose={() => {
          setIdDelete(null);
          closeModalDelete();
        }}
        closePopupAction={false}
        title="Are you sure that you want to permanently remove this group."
        content="This group will be removed permanently. This action cannot be undone."
        // loadingConfirm={loadingDelete}
        deleteAction={() => {}}
      />

      <LegacyCard sectioned>
        <div className="grid grid-cols-5 gap-6 mb-6">
          <div className="col-span-4 col-start-2">
            <Filters
              queryValue={filterData.query}
              onQueryChange={handleFiltersQueryChange}
              onQueryClear={handleQueryValueRemove}
              queryPlaceholder="Search"
              filters={[]}
              onClearAll={resetFilterData}
            >
              <div className="pl-2">
                <ButtonSort
                  active={btnSort}
                  sortValue={sortValue}
                  onSort={handleSort}
                  onShow={toggleBtnSort}
                  onClose={closeBtnSort}
                  options={optionsSort}
                />
              </div>
            </Filters>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-1">
            <CardStatistic
              className="mb-4"
              title="Public Views"
              options={[
                { label: "New", value: "1" },
                { label: "Open", value: "15" },
                { label: "Pending", value: "3" },
                { label: "Resolved", value: "15" },
                { label: "Trash", value: "3" },
              ]}
            />
            <CardStatistic
              className="mb-4"
              title="Private Views"
              options={[
                { label: "Custom A", value: "3" },
                { label: "Custom B", value: "0" },
                { label: "Custom C", value: "2" },
              ]}
            />
            <CardStatistic
              className="mb-4"
              title="Shared with me"
              options={[
                { label: "Custom A", value: "3" },
                { label: "Custom B", value: "0" },
                { label: "Custom C", value: "2" },
              ]}
            />
          </div>
          <div className="col-span-4">
            <IndexTable
              resourceName={{ singular: "group", plural: "groups" }}
              itemCount={1}
              selectable={false}
              hasMoreItems
              lastColumnSticky
              // loading={loadingList}
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
                { title: "Ticket number" },
                { title: "Ticket Title" },
                { title: "Customer" },
                { title: "Tags" },
                { title: "Priority" },
                { title: "Last Update" },
                { title: "Action" },
              ]}
            ></IndexTable>
          </div>
        </div>
      </LegacyCard>
    </Page>
  );
};

export default TicketIndexPage;
