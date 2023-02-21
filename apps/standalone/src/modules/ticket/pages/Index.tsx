import { PageComponent, useNavigate, usePrevious } from "@moose-desk/core";
import { Input, TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { env } from "process";
import { useCallback, useState } from "react";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import { Header } from "src/components/UI/Header";
import { Table } from "src/components/UI/Table";
import useMessage from "src/hooks/useMessage";
import { CardStatistic } from "src/modules/ticket/components/CardStatistic";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

interface TicketIndexPageProps {}

const TicketIndexPage: PageComponent<TicketIndexPageProps> = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  const message = useMessage();
  const defaultFilter: () => any = () => ({
    page: 1,
    limit: 20 || env.DEFAULT_PAGE_SIZE,
  });

  const [filterData, setFilterData] = useState<any>(defaultFilter);
  const [meta, setMeta] = useState<any>();

  const prevFilter = usePrevious<any>(filterData);

  const onChangeTable = useCallback(
    (pagination: any, filters: any, sorter: SorterResult<any>) => {
      if (sorter.order && sorter.columnKey) {
        setFilterData((value: any) => ({
          ...value,
          sortBy: sorter.columnKey as string,
          sortOrder: sorter.order === "ascend" ? 1 : -1,
        }));
      } else {
        setFilterData((value: any) => ({
          ...value,
          sortBy: undefined,
          sortOrder: undefined,
        }));
      }
    },
    [setFilterData]
  ) as TableProps<any>["onChange"];

  return (
    <>
      <Header title="Ticket">
        <div className="flex items-center justify-end flex-1 gap-4">
          <Input.Search
            className="max-w-[400px]"
            placeholder="Search ticket"
            onSearch={(searchText: string) => {
              setFilterData((value: any) => {
                return {
                  ...value,
                  query: searchText,
                  page: 1,
                };
              });
            }}
          ></Input.Search>
          <ButtonAdd onClick={() => navigate(TicketRoutePaths.Create)}>
            Create New Ticket
          </ButtonAdd>
        </div>
      </Header>
      <div className="mt-6">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <CardStatistic
              className="mb-4"
              keyPanel="publicViews"
              panelProps={{
                header: "Public Views",
              }}
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
              keyPanel="privateViews"
              panelProps={{
                header: "Private Views",
              }}
              options={[
                { label: "Custom A", value: "3" },
                { label: "Custom B", value: "0" },
                { label: "Custom C", value: "2" },
              ]}
            />
            <CardStatistic
              className="mb-4"
              keyPanel="sharedWithMe"
              panelProps={{
                header: "Shared with me",
              }}
              options={[
                { label: "Custom A", value: "3" },
                { label: "Custom B", value: "0" },
                { label: "Custom C", value: "2" },
              ]}
            />
          </div>
          <div className="col-span-3">
            <Table
              rowSelection={{
                type: "checkbox",
              }}
              dataSource={tickets}
              onChange={onChangeTable}
            >
              <Table.Column
                key="ticketNumber"
                title="Ticket Number"
              ></Table.Column>
              <Table.Column
                key="ticketTitle"
                title="Ticket Title"
                sorter={{
                  compare: (a: any, b: any) => a.ticketTitle - b.ticketTitle,
                }}
              ></Table.Column>
              <Table.Column
                key="customer"
                title="Customer"
                sorter={{
                  compare: (a: any, b: any) => a.customer - b.customer,
                }}
              ></Table.Column>
              <Table.Column
                key="tags"
                title="Tags"
                sorter={{
                  compare: (a: any, b: any) => a.tags - b.tags,
                }}
              ></Table.Column>
              <Table.Column
                key="priority"
                title="Priority"
                sorter={{
                  compare: (a: any, b: any) => a.priority - b.priority,
                }}
              ></Table.Column>
              <Table.Column
                key="lastUpdate"
                title="Last Update"
                sorter={{
                  compare: (a: any, b: any) => a.lastUpdate - b.lastUpdate,
                }}
              ></Table.Column>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketIndexPage;
