import {
  useDebounceFn,
  useJob,
  useNavigate,
  usePrevious,
  useToggle,
} from "@moose-desk/core";
import {
  Agent,
  AgentRepository,
  BaseMetaDataListResponse,
  GetListAgentRequest,
  Role,
} from "@moose-desk/repo";
import { Input, TableProps, Tag } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useCallback, useEffect, useState } from "react";
import { map } from "rxjs";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import { Header } from "src/components/UI/Header";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import { AgentFormValues } from "src/modules/agent/components/AgentForm";
import { PopupAgent } from "src/modules/agent/components/PopupAgent";
import { getStatusAgent } from "src/modules/agent/constant";

interface AgentsIndexProps {}

const AgentsIndex = (props: AgentsIndexProps) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const navigate = useNavigate();
  const message = useMessage();
  const {
    state: popupAgent,
    on: openPopupAgent,
    off: closePopupAgent,
  } = useToggle();

  const [dataPopup, setDataPopup] = useState<AgentFormValues | undefined>({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    role: Role.BasicAgent,
  });

  const defaultFilter: () => GetListAgentRequest = () => ({
    page: 1,
    limit: 20 || env.DEFAULT_PAGE_SIZE,
  });

  const [filterData, setFilterData] =
    useState<GetListAgentRequest>(defaultFilter);
  const [meta, setMeta] = useState<BaseMetaDataListResponse>();

  const prevFilter = usePrevious<GetListAgentRequest>(filterData);

  const { run: getListAgentApi, processing: loadingList } = useJob(
    (payload: GetListAgentRequest) => {
      return AgentRepository()
        .getList(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              const listAgent = data.data.map((item) => ({
                ...item,
                id: item._id,
              }));
              setAgents(listAgent);
              setMeta(data.metadata);
            } else {
              message.error("Get data agent failed");
            }
          })
        );
    }
  );

  const { run: getListDebounce } = useDebounceFn(
    (payload: GetListAgentRequest) => {
      getListAgentApi(payload);
    },
    { wait: 300 }
  );

  const resetFilterData = useCallback(() => {
    setFilterData(defaultFilter());
  }, []);

  const getLabelRole = useCallback(
    (role: Role) => {
      switch (role) {
        case Role.Admin:
          return "System Admin";
        case Role.AgentLeader:
          return "Agent Leader";
        case Role.BasicAgent:
          return "Basic Agent";
        default:
          return "Basic Agent";
      }
    },
    [Role]
  );

  const handleEdit = (record: Agent) => {
    setDataPopup(record);
    openPopupAgent();
  };

  const onPagination = useCallback(
    ({ page, limit }: { page: number; limit: number }) => {
      setFilterData((value) => {
        return {
          ...value,
          page,
          limit,
        };
      });
    },
    []
  );

  const handleChangePopup = useCallback((closeModal?: boolean) => {
    getListAgentApi(filterData);
    if (closeModal) {
      closePopupAgent();
    }
  }, []);

  useEffect(() => {
    if (prevFilter?.query !== filterData.query && filterData.query) {
      getListDebounce(filterData);
    } else {
      getListAgentApi(filterData);
    }
  }, [filterData]);

  const onChangeTable = useCallback(
    (pagination: any, filters: any, sorter: SorterResult<Agent>) => {
      if (sorter.order && sorter.columnKey) {
        setFilterData((value) => ({
          ...value,
          sortBy: sorter.columnKey as string,
          sortOrder: sorter.order === "ascend" ? 1 : -1,
        }));
      } else {
        setFilterData((value) => ({
          ...value,
          sortBy: undefined,
          sortOrder: undefined,
        }));
      }
    },
    [setFilterData]
  ) as TableProps<Agent>["onChange"];

  return (
    <div>
      <PopupAgent
        open={popupAgent}
        data={dataPopup as Agent}
        onCancel={closePopupAgent}
        onChange={handleChangePopup}
      />
      <Header title="Account">
        <div className="flex-1 flex justify-end">
          <ButtonAdd
            onClick={() => {
              openPopupAgent();
              setDataPopup(undefined);
            }}
          >
            Add agent
          </ButtonAdd>
        </div>
      </Header>
      <div className="search mb-6">
        <Input.Search
          placeholder="Search"
          enterButton
          onSearch={(searchText: string) => {
            setFilterData((value) => {
              return {
                ...value,
                query: searchText,
                page: 1,
              };
            });
          }}
        />
      </div>
      <div>
        <>
          <Table
            dataSource={agents}
            loading={loadingList}
            onChange={onChangeTable}
          >
            <Table.Column
              key="lastName"
              title="Agent"
              render={(_, record: Agent) => (
                <span>
                  {record.lastName === "admin"
                    ? record.firstName
                    : record.firstName + " " + record.lastName}
                </span>
              )}
              sorter={{
                compare: (a: any, b: any) => a.lastName - b.lastName,
              }}
            />
            <Table.Column
              key="email"
              title="Email"
              dataIndex="email"
              sorter={{
                compare: (a: any, b: any) => a.email - b.email,
              }}
            ></Table.Column>
            <Table.Column
              key="role"
              title="Roles"
              render={(_, record: Agent) => (
                <span>{getLabelRole(record.role)}</span>
              )}
              sorter={{
                compare: (a: any, b: any) => a.roles - b.roles,
              }}
            />
            <Table.Column
              key="isActive"
              align="center"
              title="Status"
              sorter={{
                compare: (a: any, b: any) => a.isActive - b.isActive,
              }}
              render={(_, record: Agent) => (
                <Tag
                  color={
                    getStatusAgent(record.isActive, record.emailConfirmed).color
                  }
                >
                  {getStatusAgent(record.isActive, record.emailConfirmed).label}
                </Tag>
              )}
            />
            <Table.Column
              key="2Fa"
              align="center"
              title="2FA Availability"
              render={(_, record: Agent) => (
                <span>
                  {record.twoFactorEnabled ? record.twoFactorMethod : "Off"}
                </span>
              )}
            />
            <Table.Column
              align="center"
              title="Action"
              render={(_, record: Agent) => (
                <TableAction
                  record={record}
                  edit
                  onlyIcon
                  onEdit={handleEdit}
                />
              )}
            />
          </Table>
          {meta && (
            <Pagination
              className="mt-4 flex justify-end"
              currentPage={filterData.page ?? 1}
              total={meta?.totalCount}
              pageSize={filterData.limit ?? env.DEFAULT_PAGE_SIZE}
              onChange={onPagination}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default AgentsIndex;
