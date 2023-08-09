import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import { FC, useMemo, useState } from "react";
import { useQuery } from "react-query";
import BoxSelectAssignee from "src/components/Modal/ModalFilter/BoxSelectAssignee";
import { getListAgentApi } from "src/modules/ticket/helper/api";

interface AgentSelectProps {
  disabled?: boolean;
  value?: string;
}

export const AgentSelect: FC<AgentSelectProps> = ({ disabled, ...props }) => {
  const [search, setSearch] = useState<string>(
    props.value?.split(",")[1] || ""
  );
  const debounceValue: string = useDebounce(search, 200);
  console.log("value agent", props.value?.split(",")[1]);
  const { data: dataAgents } = useQuery({
    queryKey: [
      "getAgents",
      {
        page: 1,
        limit: 10,
        isLive: 1,
        query: debounceValue,
      },
    ],
    queryFn: () =>
      getListAgentApi({
        page: 1,
        limit: 10,
        isLive: 1,
        query: debounceValue,
      }),
    staleTime: 10000,
    retry: 1,

    onError: () => {},
  });

  const agentsOptions = useMemo(() => {
    if (!dataAgents) return [];
    return dataAgents.map((item) => ({
      label: item.lastName.includes("admin")
        ? `${item.firstName} - ${item.email}`
        : `${item.firstName} ${item.lastName} - ${item.email}`,
      value: `${item._id},${item.email}`,
      obj: item,
    }));
  }, [dataAgents]);

  return (
    <BoxSelectAssignee
      onSearch={(value) => {
        setSearch(value);
      }}
      disabled={disabled}
      label="Assignee"
      data={agentsOptions}
      placeholder="Search agents"
      {...props}
    />
  );
};
