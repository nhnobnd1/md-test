import { EditOutlined } from "@ant-design/icons";
import {
  useDebounceFn,
  useJob,
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
import { Badge, Button, TableProps, Tooltip } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { map } from "rxjs";
import { HeaderList } from "src/components/HeaderList";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import { Header } from "src/components/UI/Header";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import { usePermission } from "src/hooks/usePerrmisson";
import { AgentFormValues } from "src/modules/agent/components/AgentForm";
import { PopupAgent } from "src/modules/agent/components/PopupAgent";
import { getStatusAgent } from "src/modules/agent/constant";

const AgentsIndex = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
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
  const { t } = useTranslation();
  const [showTitle, setShowTitle] = useState(true);

  const defaultFilter: () => GetListAgentRequest = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });
  const { isAgent, isLead } = usePermission();

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
              message.error(t("messages:error.get_agent"));
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

  const handleChangePopup = useCallback(
    (closeModal?: boolean) => {
      getListAgentApi(filterData);
      if (closeModal) {
        closePopupAgent();
      }
    },
    [filterData]
  );

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
        destroyOnClose
        onChange={handleChangePopup}
      />
      <Header title={showTitle ? "Agents" : ""} className="mb-5">
        <div className="flex-1 flex justify-end">
          <HeaderList
            setShowTitle={setShowTitle}
            handleSearch={(searchText: string) => {
              setFilterData((value) => {
                return {
                  ...value,
                  query: searchText,
                  page: 1,
                };
              });
            }}
          >
            <ButtonAdd
              disabled={isAgent}
              onClick={() => {
                openPopupAgent();
                setDataPopup(undefined);
              }}
            >
              Add agent
            </ButtonAdd>
          </HeaderList>
        </div>
      </Header>

      <div className="">
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
                <span
                  className={
                    !isAgent && !(isLead && record.role === Role.Admin)
                      ? `cursor-pointer hover:underline hover:text-blue-500`
                      : ``
                  }
                  onClick={() => {
                    if (!isAgent && !(isLead && record.role === Role.Admin)) {
                      handleEdit(record);
                    }
                  }}
                >
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
                <Badge
                  color={
                    getStatusAgent(record.isActive, record.emailConfirmed).color
                  }
                  text={
                    getStatusAgent(record.isActive, record.emailConfirmed).label
                  }
                ></Badge>
              )}
            />
            <Table.Column
              key="twoFactorEnabled"
              align="center"
              title="2FA Availability"
              render={(_, record: Agent) => (
                <span>
                  {record.twoFactorEnabled ? record.twoFactorMethod : "Off"}
                </span>
              )}
              sorter={{
                compare: (a: any, b: any) =>
                  a.twoFactorEnabled - b.twoFactorEnabled,
              }}
            />
            {!isAgent ? (
              <Table.Column
                align="center"
                title="Action"
                render={(_, record: Agent) =>
                  !isAgent && !(isLead && record.role === Role.Admin) ? (
                    <TableAction
                      record={record}
                      edit={!isAgent}
                      onlyIcon
                      onEdit={handleEdit}
                    />
                  ) : (
                    <Tooltip
                      placement="top"
                      title={"You do not have permission to edit this account"}
                    >
                      <Button
                        type="primary"
                        disabled
                        icon={<EditOutlined />}
                      ></Button>
                    </Tooltip>
                  )
                }
              />
            ) : (
              <></>
            )}
          </Table>
          {meta && agents.length > 0 && (
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
