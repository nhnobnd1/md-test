import {
  useDebounceFn,
  useJob,
  useNavigate,
  usePrevious,
} from "@moose-desk/core";
import {
  Agent,
  AgentRepository,
  BaseMetaDataListResponse,
  GetListAgentRequest,
} from "@moose-desk/repo";
import { Tag } from "antd";
import { useCallback, useEffect, useState } from "react";
import { map } from "rxjs";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import { Header } from "src/components/UI/Header";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import { Role } from "src/models/Rule";
import { getStatusAgent } from "src/modules/agent/constant";

interface AgentsIndexProps {}

const AgentsIndex = (props: AgentsIndexProps) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const navigate = useNavigate();
  const message = useMessage();

  const defaultFilter: () => GetListAgentRequest = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
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
    console.log(record);
  };

  const onPagination = useCallback(({ page, limit }) => {
    setFilterData((value) => {
      return {
        ...value,
        page,
        limit,
      };
    });
  }, []);

  useEffect(() => {
    if (prevFilter?.query !== filterData.query && filterData.query) {
      getListDebounce(filterData);
    } else {
      getListAgentApi(filterData);
    }
  }, [filterData]);

  return (
    <div>
      <Header title="Account">
        <div className="flex-1 flex justify-end">
          <ButtonAdd>Add agent</ButtonAdd>
        </div>
      </Header>
      <div>
        {agents && (
          <>
            <Table dataSource={agents} loading={loadingList}>
              <Table.Column
                key="agent"
                title="Agent"
                render={(_, record: Agent) => (
                  <span>
                    {record.lastName === "admin"
                      ? record.firstName
                      : record.firstName + " " + record.lastName}
                  </span>
                )}
              />
              <Table.Column
                key="email"
                title="Email"
                dataIndex="email"
              ></Table.Column>
              <Table.Column
                key="roles"
                title="Roles"
                render={(_, record: Agent) => (
                  <span>{getLabelRole(record.role)}</span>
                )}
              />
              <Table.Column
                key="status"
                title="Status"
                render={(_, record: Agent) => (
                  <Tag
                    color={
                      getStatusAgent(record.isActive, record.emailConfirmed)
                        .color
                    }
                  >
                    {
                      getStatusAgent(record.isActive, record.emailConfirmed)
                        .label
                    }
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
        )}
      </div>
    </div>
  );
};

export default AgentsIndex;
