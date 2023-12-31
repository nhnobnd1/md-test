import { useNavigate, useToggle, useUser } from "@moose-desk/core";
import { Agent, GetListAgentRequest, Role } from "@moose-desk/repo";
import { Badge, TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
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
import { getListAgentFilter } from "src/modules/agent/helper/api";
import { hiddenEditAgent } from "src/modules/agent/helper/function";
import { defaultFilter } from "src/utils/localValue";

const AgentsIndex = () => {
  const message = useMessage();
  const navigate = useNavigate();
  const { sub: userId, isOwner }: string | any = useUser();
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

  const { isAgent, isLead, isAdmin } = usePermission();

  const [filterData, setFilterData] =
    useState<GetListAgentRequest>(defaultFilter);

  const {
    data: dataAgents,
    isLoading: loadingList,
    refetch,
  } = useQuery({
    queryKey: ["getAgents", filterData],
    queryFn: () => getListAgentFilter(filterData),
    retry: 1,

    onError: () => {
      message.error(t("messages:error.get_agent"));
    },
  });

  const agents = useMemo(() => {
    if (!dataAgents?.data) return [];
    return dataAgents.data;
  }, [dataAgents?.data]);
  const meta = useMemo(() => {
    if (!dataAgents?.metadata)
      return { page: 0, totalPage: 0, totalCount: 0, resultsPerPage: 0 };
    return dataAgents.metadata;
  }, [dataAgents?.metadata]);

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
      // getListAgentApi(filterData);
      refetch();
      if (closeModal) {
        closePopupAgent();
      }
    },
    [filterData]
  );

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
  const renderAction = (data: Agent) => {
    const isView =
      hiddenEditAgent(
        isOwner,
        userId === data?._id,
        data?.isOwner,
        isAdmin,
        isLead,
        isAgent,
        data?.role
      ) || !(data?.isActive && data?.emailConfirmed);
    return (
      <TableAction
        record={data}
        edit={!isView}
        onlyIcon
        onEdit={() => navigate(`/agents?agent=${data?._id}`)}
        view={isView}
        onView={() => navigate(`/agents?agent=${data?._id}`)}
      />
    );
  };

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
            {!isAgent && (
              <ButtonAdd
                onClick={() => {
                  openPopupAgent();
                  setDataPopup(undefined);
                }}
              >
                Add new
              </ButtonAdd>
            )}
          </HeaderList>
        </div>
      </Header>

      <div className="">
        <>
          <Table
            dataSource={agents}
            loading={loadingList}
            onChange={onChangeTable}
            scroll={{ x: 1024 }}
          >
            <Table.Column
              ellipsis
              key="lastName"
              title="Agent Name"
              render={(_, record: Agent) => (
                <span
                  className={`cursor-pointer hover:underline hover:text-blue-500`}
                  onClick={() => {
                    navigate(`/agents?agent=${record?._id}`);
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
              width="25%"
            />
            <Table.Column
              ellipsis
              key="email"
              title="Email"
              dataIndex="email"
              sorter={{
                compare: (a: any, b: any) => a.email - b.email,
              }}
              width="25%"
              render={(_, record: Agent) => (
                <span className="">{record.email}</span>
              )}
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
              width="15%"
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
              width="10%"
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
              width="10%"
            />

            <>
              <Table.Column
                align="center"
                title="Action"
                render={(_, record: Agent) => renderAction(record)}
                width="15%"
              />
            </>
          </Table>
          {meta && agents.length > 0 && (
            <div className="flex justify-end items-end bg-white rounded-br-md rounded-bl-md pb-2 pr-4">
              <Pagination
                className="mt-2 flex justify-end"
                currentPage={filterData.page ?? 1}
                total={meta?.totalCount}
                pageSize={filterData.limit ?? env.DEFAULT_PAGE_SIZE}
                onChange={onPagination}
              />
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default AgentsIndex;
