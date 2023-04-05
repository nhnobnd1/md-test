import {
  upperCaseFirst,
  useJob,
  useNavigate,
  useParams,
} from "@moose-desk/core";
import {
  BaseListTagRequest,
  BaseMetaDataListResponse,
  TagRepository,
  Ticket,
} from "@moose-desk/repo";
import {
  Button,
  Card,
  ChoiceList,
  EmptySearchResult,
  Icon,
  IndexTable,
  Link,
  Page,
  Popover,
  Text,
} from "@shopify/polaris";
import { SortMinor } from "@shopify/polaris-icons";
import dayjs from "dayjs";

import { FC, useCallback, useEffect, useState } from "react";
import { map } from "rxjs";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import { Pagination } from "src/components/Pagination";
import SettingRoutePaths from "src/modules/setting/routes/paths";

interface ViewTicketProps {}
const defaultFilter = () => ({
  page: 1,
  limit: 10,
  query: "",
  sortBy: undefined,
  sortOrder: undefined,
});
const ViewTicket: FC<ViewTicketProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [meta, setMeta] = useState<BaseMetaDataListResponse>();
  const [filterData, setFilterData] =
    useState<BaseListTagRequest>(defaultFilter);
  const [popoverSort, setPopoverSort] = useState(false);

  const togglePopoverSort = useCallback(
    () => setPopoverSort((popoverSort) => !popoverSort),
    []
  );
  const [sortTag, setSortTag] = useState(2);

  const handleSortChange = useCallback((value) => {
    setSortTag(parseInt(value[0]));
  }, []);
  const choices = [
    { label: "Sort by Title A-Z", value: "0" },
    { label: "Sort by Title Z-A", value: "1" },
    { label: "Sort by Date Requested A-Z", value: "2" },
    { label: "Sort by Date Requested Z-A", value: "3" },
    { label: "Sort by Last Updated A_Z", value: "4" },
    { label: "Sort by Last Updated Z_A", value: "5" },
    { label: "Sort by Status A-Z", value: "6" },
    { label: "Sort by Status Z-A", value: "7" },
    { label: "Sort by Priority A-Z", value: "8" },
    { label: "Sort by Priority Z-A", value: "9" },
  ];
  const { run: getTicketByTagApi, processing } = useJob(
    (id: string, params: BaseListTagRequest) => {
      return TagRepository()
        .getListTicket(id, params)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              //   console.log("data repsonse", data.data);
              setTickets(data.data);
              setMeta(data.metadata);
            } else {
              //   message.error("Get ticket failed");
            }
          })
        );
    },
    {
      showLoading: true,
    }
  );
  const { run: deleteForceApi } = useJob((id: string) => {
    return TagRepository()
      .deleteForce(id)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            // message.success("Deleted Successfully !");
            // navigate(SettingRoutePaths.Workdesk.Tag.Index);
          } else {
            // message.error("Get ticket failed");
          }
        })
      );
  });

  const handleDelete = () => {};
  useEffect(() => {
    if (id) {
      getTicketByTagApi(id, filterData);
    }
  }, [filterData, id]);

  console.log({ tickets });

  return (
    <>
      <Page
        breadcrumbs={[
          { onAction: () => navigate(SettingRoutePaths.Workdesk.Tag.Index) },
        ]}
        fullWidth
        compactTitle
        title={`Tickets tagged with "${id}"`}
      >
        <div className="flex justify-between">
          <div className="flex justify-start p-3">
            <Popover
              active={popoverSort}
              activator={
                <Button
                  onClick={togglePopoverSort}
                  icon={<Icon source={() => <SortMinor />} color="base" />}
                >
                  Sort
                </Button>
              }
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
          </div>
          <Link onClick={() => {}} removeUnderline>
            <Text alignment="end" variant="bodyMd" fontWeight="bold" as="span">
              Remove Tags from all Tickets
            </Text>
          </Link>
        </div>

        <Card>
          <div className="flex-1 px-4 pt-4 pb-2 mt-5">
            <IndexTable
              resourceName={{ singular: "ticket", plural: "tickets" }}
              itemCount={tickets.length}
              selectable={false}
              hasMoreItems
              headings={[
                { title: "Title" },
                { title: "Date Requested" },
                { title: "Last Updated" },
                { title: "Status" },
                { title: "Priority" },
              ]}
              loading={processing}
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
              {tickets.map((item: Ticket, index) => (
                <IndexTable.Row id={item._id} key={item._id} position={index}>
                  <IndexTable.Cell className="py-3">
                    {item.subject}
                  </IndexTable.Cell>
                  <IndexTable.Cell className="py-3">
                    {item.createdDatetime
                      ? dayjs(item.createdDatetime).format("DD-MM-YYYY")
                      : ""}
                  </IndexTable.Cell>
                  <IndexTable.Cell className="py-3">
                    {item.updatedDatetime
                      ? dayjs(item.updatedDatetime).format("DD-MM-YYYY")
                      : ""}
                  </IndexTable.Cell>
                  <IndexTable.Cell className="py-3">
                    {upperCaseFirst(item.status)}
                  </IndexTable.Cell>
                  <IndexTable.Cell className="py-3">
                    {upperCaseFirst(item.priority)}
                  </IndexTable.Cell>
                </IndexTable.Row>
              ))}
            </IndexTable>
          </div>
        </Card>
        {meta?.totalCount
          ? meta && (
              <div className="flex items-center justify-center mt-4">
                <Pagination
                  currentPage={filterData.page ?? 1}
                  total={meta?.totalCount}
                  pageSize={filterData.limit ?? 10}
                  onChangePage={(page) =>
                    setFilterData((val) => ({ ...val, page }))
                  }
                  previousTooltip={"Previous"}
                  nextTooltip={"Next"}
                />
              </div>
            )
          : null}
      </Page>
      <ModalDelete
        title="Are you sure that you want to premanently remove this Tag?"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        content={
          "This Tag will be removed permanently. This actions can not be undone. All tickets which are using this tag will get affected too."
        }
        deleteAction={() => handleDelete()}
        textConfirm="Remove"
      />
    </>
  );
};

export default ViewTicket;
